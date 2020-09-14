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
    navigator.geolocation.getCurrentPosition(
      result => {
        const coordinates = {
          lat: result.coords.latitude,
          long: result.coords.longitude
        };
      },
      error => {
        console.log('Could not locate you! please enter address manually');
      }
    )
  }
  findAddressHandler () {}
}

const placeFinder = new PlaceFinder();