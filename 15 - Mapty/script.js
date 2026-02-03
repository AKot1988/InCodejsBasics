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

form.addEventListener('submit', function (e) {
  // console.log('form Submited');
  // const newFormData = new FormData(form);
  // const newWorkoutData = {
  //   type: newFormData.get('type'),
  //   distance: +newFormData.get('distance'),
  //   duration: +newFormData.get('duration'),
  //   cadence: +newFormData.get('cadence'),
  //   elevation: +newFormData.get('elevation'),
  // };
  // const workoutData = localStorage.getItem('workoutData')
  //   ? JSON.parse(localStorage.getItem('workoutData'))
  //   : [];
  // workoutData.push(newWorkoutData);
  // localStorage.setItem('workoutData', JSON.stringify(workoutData));
});

// inputType.addEventListener('change', function () {
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
// });
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    this._toggleElevationField();
    form.addEventListener('submit', this._newWorkout.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        },
      );
    }
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    console.log(coords);

    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }
  _newWorkout() {
    e.preventDefault();
    // ----------------------clear input fields----------------------
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // ----------add marker to map on click-----------
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        }),
      )
      .setPopupContent('Workout')
      .openPopup();
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    form.classList.add('hidden');
  }
  _toggleElevationField() {
    inputType.addEventListener('change', function () {
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
      inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
    });
  }
}

const app = new App();
// app._getPosition();

// app._toggleElevationField();
