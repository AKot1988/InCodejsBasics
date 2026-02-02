'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      console.log(coords);

      map = L.map('map').setView(coords, 13);

      map.on('click', function (mapE) {
        mapEvent = mapE;
        // console.log(mapE);
        form.classList.remove('hidden');
        inputDistance.focus();
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position');
    },
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('form Submited');
  const newFormData = new FormData(form);
  const newWorkoutData = {
    type: newFormData.get('type'),
    distance: +newFormData.get('distance'),
    duration: +newFormData.get('duration'),
    cadence: +newFormData.get('cadence'),
    elevation: +newFormData.get('elevation'),
  };

  const workoutData = localStorage.getItem('workoutData')
    ? JSON.parse(localStorage.getItem('workoutData'))
    : [];

  debugger;
  workoutData.push(newWorkoutData);
  localStorage.setItem('workoutData', JSON.stringify(workoutData));
});

inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
