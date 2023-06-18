/* eslint-disable @typescript-eslint/no-unused-vars */
const route = '/data/';

async function getDevices() {
  let json = await getFromRoute(route + '/devices');

  let array = [];

  for (let i = 0; i < json.length; i++) {
    array[i] = json[i].temperature;
  }

  return array;
}

async function getLabels() {
  const deviceId = document.getElementById('ids').value;
  let json = await getFromRoute(route + 'dates/' + deviceId);

  let array = [];

  for (let i = 0; i < json.length; i++) {
    const date = new Date(json[i]);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // format date to dd-mm-yyyy-hh-mm-ss
    const _date = date.getUTCDate();
    const _month = months[date.getUTCMonth()];
    const _year = date.getUTCFullYear();
    const _hour = date.getUTCHours();
    const _minute = date.getUTCMinutes();
    const _second = date.getUTCSeconds();

    array.push(
      _date +
        ' ' +
        _month +
        ' ' +
        _year +
        ' ' +
        (_hour < 10 ? '0' : '') +
        _hour +
        ':' +
        (_minute < 10 ? '0' : '') +
        _minute +
        ':' +
        (_second < 10 ? '0' : '') +
        _second,
    );
  }

  return array;
}

async function getPressure() {
  const deviceId = document.getElementById('ids').value;

  let json = await getFromRoute(route + deviceId);

  let array = [];

  for (let i = 0; i < json.length; i++) {
    array[i] = json[i].pressure;
  }

  return array;
}

async function getTemperature() {
  const deviceId = document.getElementById('ids').value;

  let json = await getFromRoute(route + deviceId);

  let array = [];

  for (let i = 0; i < json.length; i++) {
    array[i] = json[i].temperature;
  }

  return array;
}

async function getHumidity() {
  const deviceId = document.getElementById('ids').value;

  let json = await getFromRoute(route + deviceId);

  let array = [];

  for (let i = 0; i < json.length; i++) {
    array[i] = json[i].humidity;
  }

  return array;
}

async function getAltitude() {
  const deviceId = document.getElementById('ids').value;

  let json = await getFromRoute(route + deviceId);
  let array = [];

  for (let i = 0; i < json.length; i++) {
    array[i] = json[i].altitude;
  }

  return array;
}
