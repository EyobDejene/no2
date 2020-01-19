
export function getGeoCode(street,number,postalcode) {

    //const url
  // ="http://open.mapquestapi.com/geocoding/v1/address?key=Yf8tZg3Uza4ygM7TmuKnfAnhWtwbAinB&street="+streetname+"%20"+housenumber+"&postalCode="+postalcode+"&ambiguities=true&maxResults=1";
    const url ="https://maps.googleapis.com/maps/api/geocode/json?address="+street+" "+number+" "+postalcode+"&key=AIzaSyBqut4oPHakxngbilRwB52oadxSNlbB3fg";
    //const url =
  // "http://open.mapquestapi.com/geocoding/v1/address?key=Yf8tZg3Uza4ygM7TmuKnfAnhWtwbAinB&location="+streetname+"%20"+housenumber+","+postalcode;
    let result = fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {

        let street = data.results[0].address_components[1].long_name;
        let number = data.results[0].address_components[0].long_name;
        let postalcode = data.results[0].address_components[7].long_name;
        let geometry = data.results[0].geometry.location;
        let location = data.results[0].address_components[3].long_name;
        let object = {placename:street+" "+number,postalcode:postalcode,location:location,geometry:geometry};

        if(location.includes("Amsterdam")){
          localStorage.setItem('location', JSON.stringify(object));
        }
        console.log(data)
        // Work with JSON data here
        // console.log(data.results[0].locations[0].latLng)
        // let latlong = data.results[0].locations[0].latLng;
        // if(data.results[0].locations[0].adminArea5 == "Amsterdam") {
        //     localStorage.setItem('latlong', JSON.stringify(latlong));
        //     return data;
        //   // return
        //
        // }else{
        //   return false
        // }
        return data

      })
      .catch(err => {
        console.log(err)
        return false
        // Do something for an error here
      });
    return result;
}

export default getGeoCode;











