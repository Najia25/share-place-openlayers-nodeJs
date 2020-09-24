import MapConfig from './UI/MapConfig';

class LoadedPlace {
  constructor(coordinates, address) {
    MapConfig(coordinates.long, coordinates.lat)
    const headerTitle = document.querySelector('header h1');
    headerTitle.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: parseFloat(queryParams.get('lat')),
  long: parseFloat(queryParams.get('long'))
}
const address = queryParams.get('address');
new LoadedPlace(coords, address);
