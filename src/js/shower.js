export function shower(minutes) {

  let noxValue = 0;
  let minutesField =  document.querySelector('.minutes');
  let minuteSaved =   JSON.parse(localStorage.getItem('shower'));

  if(minutesField) {
    if (typeof minutes == 'undefined') {
      if(minuteSaved) {
        minutes = minuteSaved.minutes;
      }else{
        minutes = minutesField.getAttribute('data-minutes');
      }
    }

    noxValue = 0.0064557 * minutes;
    console.log(minuteSaved)
    let DataoObject = {minutes: minutes, noxValue: noxValue};
    localStorage.setItem('shower', JSON.stringify(DataoObject));
    minutesField.innerHTML = minutes;
    minutesField.setAttribute('data-minutes', minutes);
    console.log(minutes);
  }

}



export default shower();
