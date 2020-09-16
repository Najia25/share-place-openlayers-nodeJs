import { Modal } from './UI/Modal'; //named import corresponding to named export

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locareUserHandler); // this here refers to the object created with this constructor
    addressForm.addEventListener('submit', this.findAddressHandler);
  }
  locareUserHandler () {
    if (!navigator.geolocation) {
      alert('Sorry! location feature is not available in your browser!');
      return;
    }
    const modal = new Modal('loading-modal-content');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      result => {
        modal.hide();
        const coordinates = {
          lat: result.coords.latitude,
          long: result.coords.longitude
        };
        debugger
        console.log(coordinates);
      },
      error => {
        modal.hide();
        console.log('Could not locate you! please enter address manually');
      }
    )
  }
  findAddressHandler () {}
}

const placeFinder = new PlaceFinder();