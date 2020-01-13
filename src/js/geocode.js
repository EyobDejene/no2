


export function getGeoCode(streetname,housenumber) {
    const url = "http://open.mapquestapi.com/geocoding/v1/address?key=Yf8tZg3Uza4ygM7TmuKnfAnhWtwbAinB&location=" + streetname + "%20" + housenumber + ",Amsterdam,NL";
    let result = fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // console.log(data.results[0].locations[0].latLng)
        let latlong = data.results[0].locations[0].latLng;
        localStorage.setItem('latlong', JSON.stringify(latlong));
        // return
        console.log('added!');

      })
      .catch(err => {
        // Do something for an error here
      })
    return result
}

export default getGeoCode;











