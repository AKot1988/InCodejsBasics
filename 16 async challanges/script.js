// // Coding Challenge #2

// /*
// Build the image loading functionality that I just showed you on the screen.

// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a
// promise which creates a new image (use document.createElement('img')) and sets the .src attribute
// to the provided image path. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In
// case there is an error loading the image ('error' event), reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second
// image (HINT: Use the image element returned by the createImage promise to hide the current image. You will
// need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed
// to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// GOOD LUCK 😀
let imgElement;

const imgContainer = document.querySelector('.images');
wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((res, rej) => {
    const imgElement = document.createElement('img');
    imgElement.src = imgPath;
    imgElement.addEventListener('load', () => {
      res(imgElement);
    });
    imgElement.addEventListener('error', () => {
      rej(new Error('Img not found'));
    });
  });
};

// createImage('img/img-1.jpg')
//   .then((img) => {
//     imgElement = img;
//     imgContainer.insertAdjacentElement('afterbegin', imgElement);
//   })
//   .then(() => wait(2))
//   .then(() => (imgElement.style.display = 'none'))
//   .then(() => createImage('img/img-2.jpg'))
//   .then((img) => {
//     imgContainer.insertAdjacentElement('afterbegin', img);
//     imgElement = img;
//   })
//   .then(() => wait(2))
//   .then(() => (imgElement.style.display = 'none'));

// // Coding Challenge #3

// /*
// PART 1
// Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using
// async/await (only the part where the promise is consumed). Compare the two versions, think
// about the big differences, and see which one you like more.
// Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev
// tools Network tab.

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function
// (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'paralell' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause'
// function.

// GOOD LUCK 😀

// -----------------------First part---------------------------

// const loadNPause = async function () {
//   try {
//     const img = await createImage('img/img-1.jpg');
//     imgElement = img;
//     imgContainer.insertAdjacentElement('afterbegin', imgElement);
//     console.log('Image 1 loaded');
//     await wait(2);
//     imgElement.style.display = 'none';
//     const img2 = await createImage('img/img-2.jpg');
//     imgContainer.insertAdjacentElement('afterbegin', img2);
//     imgElement = img2;
//     console.log('Image 2 loaded');
//     await wait(2);
//     imgElement.style.display = 'none';
//   } catch (err) {
//     throw new Error(`💥 ${err.message}`);
//   } finally {
//     console.log('Finished');
//   }
// };

// loadNPause();

// ---------------second part---------------------------
const loadAll = async function (pathArr) {
  try {
    const imgs = pathArr.map((path) => createImage(path));
    console.log(imgs);
    const loadedImgs = await Promise.all(imgs);
    console.log(loadedImgs);
    loadedImgs.forEach((img) => {
      img.classList.add('parallel');
      imgContainer.insertAdjacentElement('afterbegin', img);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Finished');
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// -------------------------small challange from the video №276  12:45-------------------------
// const whereAmI = async function () {
//   try {
//     const getPosition = function () {
//       return new Promise(function (resolve) {
//         navigator.geolocation.getCurrentPosition(resolve);
//       });
//     };
//     const pos = await getPosition();
//     console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//     );
//     // const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.countryCode}`
//     );

//     if (!res.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.error(`${err.message} 💥`);
//   }
// };
// whereAmI();
