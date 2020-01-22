export function travel(change) {

  if(document.querySelector('.travel')) {
    let dataSaved = JSON.parse(localStorage.getItem('travel'));
    let bus, tram, train, metro, car, motor, car_save, scooter_save, bike, scooter;
    let noxValue = 0;
    if (dataSaved && change === true) {
      bus = dataSaved[0].bus;
      tram = dataSaved[1].tram;
      train = dataSaved[2].train;
      metro = dataSaved[3].metro;
      car = dataSaved[4].car;
      motor = dataSaved[5].motor;
      car_save = dataSaved[6].car_save;
      scooter_save = dataSaved[7].scooter_save;
      bike = dataSaved[8].bike;
      scooter = dataSaved[9].scooter;

      if (document.querySelector('.input-number')) {
        document.getElementsByName("bus")[0].value = bus;
        document.getElementsByName("tram")[0].value = tram;
        document.getElementsByName("train")[0].value = train;
        document.getElementsByName("metro")[0].value = metro;
        document.getElementsByName("car")[0].value = car;
        document.getElementsByName("motor")[0].value = motor;
        document.getElementsByName("car_save")[0].value = car_save;
        document.getElementsByName("scooter_save")[0].value = scooter_save;
        document.getElementsByName("bike")[0].value = bike;
        document.getElementsByName("scooter")[0].value = scooter;
      }

    } else {
      if (document.querySelector('.input-number')) {
        bus = document.getElementsByName("bus")[0].value;
        tram = document.getElementsByName("tram")[0].value;
        train = document.getElementsByName("train")[0].value;
        metro = document.getElementsByName("metro")[0].value;
        car = document.getElementsByName("car")[0].value;
        motor = document.getElementsByName("motor")[0].value;
        car_save = document.getElementsByName("car_save")[0].value;
        scooter_save = document.getElementsByName("scooter_save")[0].value;
        bike = document.getElementsByName("bike")[0].value;
        scooter = document.getElementsByName("scooter")[0].value;
      }
    }

    let DataoObject = [
      {bus: bus, noxValue: 1.13 * bus},
      {tram: tram, noxValue: 0 * tram},
      {train: train, noxValue: 0 * train},
      {metro: metro, noxValue: 0 * metro},
      {car: car, noxValue: 0.10 * car},
      {motor: motor, noxValue: 1.2 * motor},
      {car_save: car_save, noxValue: 0 * car_save},
      {scooter_save: scooter_save, noxValue: 0 * scooter_save},
      {bike: bike, noxValue: 0 * bike},
      {scooter: scooter, noxValue: 0.17 * scooter}
    ];

    localStorage.setItem('travel', JSON.stringify(DataoObject));

  }

}


export default travel;
