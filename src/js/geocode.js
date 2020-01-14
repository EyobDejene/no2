

export function getGeoCode(streetname,housenumber,postalcode) {

    const url ="http://open.mapquestapi.com/geocoding/v1/address?key=Yf8tZg3Uza4ygM7TmuKnfAnhWtwbAinB&street="+streetname+"%20"+housenumber+"&postalCode="+postalcode+"&ambiguities=true&maxResults=1";
    //const url =
  // "http://open.mapquestapi.com/geocoding/v1/address?key=Yf8tZg3Uza4ygM7TmuKnfAnhWtwbAinB&location="+streetname+"%20"+housenumber+","+postalcode;
    let result = fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        // console.log(data.results[0].locations[0].latLng)
        let latlong = data.results[0].locations[0].latLng;
        if(data.results[0].locations[0].adminArea5 == "Amsterdam") {
            localStorage.setItem('latlong', JSON.stringify(latlong));
            return data;
          // return

        }else{
          return false
        }

      })
      .catch(err => {
        return false
        // Do something for an error here
      });
    return result;
}

export default getGeoCode;











