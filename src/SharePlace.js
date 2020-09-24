import { Modal } from './UI/Modal'; //named import corresponding to named export
import MapConfig from './UI/MapConfig';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    locateUserBtn.addEventListener('click', this.locareUserHandler.bind(this)); // this here refers to the object created with this constructor
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
  }

  async sharePlaceHandler () {
    const sharedLinkInputElement = document.getElementById('share-link');
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }
    try {
      await navigator.clipboard.writeText(sharedLinkInputElement.value);
      alert('Link copied to clipboard!')
    } catch (err) {
      console.log(err);
      sharedLinkInputElement.select();
    }
  }

  selectPlace(coordinates, address ) {
    const long = coordinates.long.toFixed(2);
    const lat = coordinates.lat.toFixed(2);
    if(this.map) {
      MapConfig(long, lat, this.map);
    } else { 
      this.map = MapConfig(long, lat);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInput = document.getElementById('share-link');
    sharedLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${lat}&long=${long}`;
  }

  locareUserHandler () {
    if (!navigator.geolocation) {
      alert('Sorry! location feature is not available in your browser!');
      return;
    }
    const modal = new Modal('loading-modal-content');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async result => {
        const coordinates = {
          lat: result.coords.latitude,
          long: result.coords.longitude
        };
        console.log(coordinates);
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      error => {
        modal.hide();
        console.log('Could not locate you! please enter address manually');
      }
    )
  }
  async findAddressHandler (event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Invalid address enetred - please try again!');
      return;
    }
    const modal = new Modal('loading-modal-content');
    modal.show();
    try {
      var coordinates = await getCoordsFromAddress(address);
      coordinates.long = parseFloat(coordinates.long);
      coordinates.lat = parseFloat(coordinates.lat);
      console.log(coordinates);
      this.selectPlace(coordinates, coordinates.address);
    } catch (err) {
      alert('Could not find the location! Please type in a valid address');
    }
    modal.hide();
  }
}
const placeFinder = new PlaceFinder();
