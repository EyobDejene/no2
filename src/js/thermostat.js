
export function thermostat(temprature) {

  let noxValue = 0;
  let unit = '&#xb0;';
 // let valueStored =  JSON.parse(localStorage.getItem('thermostat'));
  let tempratureField =  document.querySelector('.temprature');

if(tempratureField) {
  console.log(typeof  temprature)
  if (typeof temprature !== "undefined") {
    tempratureField.setAttribute('data-temprature', temprature);
    tempratureField.innerHTML = temprature + unit;
    let DataoObject = {temprature: temprature, noxValue: noxValue};
    localStorage.setItem('thermostat', JSON.stringify(DataoObject));
    tempratureField.innerHTML = temprature;
  } else {

    temprature = 20;
    // let tempratureField =  document.querySelector('.temprature');
    tempratureField.setAttribute('data-temprature', temprature);
    tempratureField.innerHTML = temprature + unit;
    let DataoObject = {temprature: temprature, noxValue: noxValue};
    localStorage.setItem('thermostat', JSON.stringify(DataoObject));
  }
}
}
// else {
//   temprature = 20;
//   if (tempratureField) {
//     tempratureField.setAttribute('data-temprature', temprature);
//     tempratureField.innerHTML = temprature + unit;
//     let DataoObject = {temprature: temprature, noxValue: noxValue};
//     localStorage.setItem('thermostat', JSON.stringify(DataoObject));
//   }
// }
export default thermostat();
