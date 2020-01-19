
export function furnace() {
    let noxValue = 0;
    let ele = document.getElementsByName('type_furnace');
    let value;

    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {

        if(ele[i].value === "inductie"){
          noxValue = 1;
        }else if(ele[i].value === "gas"){
          noxValue = 2;
        }else if(ele[i].value === "keramisch"){
          noxValue = 3;
        }
        let DataoObject = {furnace: ele[i].value,noxValue:noxValue};
        localStorage.setItem('furnace', JSON.stringify(DataoObject));
        value = ele[i].value;
      }
    }

  // check if furnace is stored
  let furnaceStored = JSON.parse(localStorage.getItem('furnace'));
  let radioButtons = document.querySelectorAll('.radioOptions');
  if(radioButtons.length >0) {
    if (furnaceStored) {
      furnaceStored = furnaceStored.furnace;
      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].value === furnaceStored) {
          radioButtons[i].setAttribute('checked', 'checked');
        } else {
          radioButtons[i].removeAttribute('checked');
        }
      }
    }else {
      radioButtons[0].setAttribute('checked', 'checked')
      let DataoObject = {furnace: radioButtons[0].value,noxValue:noxValue};
      localStorage.setItem('furnace', JSON.stringify(DataoObject));
    }
  }

  return value;



}

export default furnace();
