export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${urlAddress}`)
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates. Please try again!');
  }
  const data = await response.json();
  console.log(data);
  return {
    address: data[0].display_name,
    lat: data[0].lat,
    long: data[0].lon
  };
}

export async function getAddressFromCoords(coords) {
  console.log(coords);
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${coords.long.toFixed(2)}&lat=${coords.lat.toFixed(2)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch addrrfsdfdsfess. Please try again!');
  }
  const data = await response.json();
  const address = data.display_name;
  console.log(data);
  return address;
}