export function thermostat(temprature) {
  let noxValue = 13.4;
  let tempratureField =  document.querySelector('.temprature');
  let tempratureSaved =   JSON.parse(localStorage.getItem('thermostat'));
  if(tempratureField) {

    if (typeof temprature === 'undefined') {
       if(tempratureSaved) {
         temprature = tempratureSaved.temprature;
       }else{
         temprature = tempratureField.getAttribute('data-temprature');
       }
    } else {
      temprature = tempratureField.getAttribute('data-temprature');
    }
    console.log(temprature)
    if(temprature < 5) {
      noxValue =  temprature / noxValue * 0.871;
    }else{
      noxValue = (temprature - 20) * 0.871 + noxValue;
    }

    let DataoObject = {temprature: temprature, noxValue: noxValue};
    localStorage.setItem('thermostat', JSON.stringify(DataoObject));

  }
}



export default thermostat();

