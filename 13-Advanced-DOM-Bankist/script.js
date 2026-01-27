'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navContainer = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');

const openModal = function (ev) {
  ev.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const section1 = document.querySelector('#section--1');
  // section1.scrollIntoView({ behavior: 'smooth' });
  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

// табси з контентом
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // нижче перевіряю чи парент з класом operations__tab існує (тоді я клікнув саме на тав)
  if (!clicked) return;
  // знімаю у всіх табів активний клас і додаю його тільки на той, на який клікнув
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // активую контент відповідного табу
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active'),
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// фейд меню

const handleFade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// моммент в тому, що bind створює нову функцію з прив'язаним значенням this, в яке просто потрапляє аргумент - значення опасіті і все!
navContainer.addEventListener('mouseover', handleFade.bind(0.2));
navContainer.addEventListener('mouseout', handleFade.bind(1));

// стікі навігація
// const initCoords = section1.getBoundingClientRect();
// console.log(initCoords);
// window.addEventListener('scroll', function (ev) {
//   if (window.scrollY > initCoords.top) navContainer.classList.add('sticky');
//   else navContainer.classList.remove('sticky');
// });

// але тут якась ерунда тіпа інтерсекшн обсервера краще юзати

// хедер як елемент я оголосив вище разом з іншими константами]

const stikyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navContainer.classList.add('sticky');
  else navContainer.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stikyNav, {
  root: null,
  threshold: 0.1,
});

headerObserver.observe(header);

// observer API ti hide\show sections!!!
// Насправді - це кунгФу!

// вибираємо всі секції на сторінці
const allSections = document.querySelectorAll('.section');

// Створюємо функцію, яка буде викликатися, коли спостерігач помітить перетин цільового елемента з вьюпортом
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
// створюємо спостерігача з вказаною функцією зворотного виклику та параметрами
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
// console.log(allSections);

// додаємо клас приховування до всіх секцій та починаємо спостереження за кожною секцією
allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//Lazy loading images by Observer API

const images = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const lazyImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(img => lazyImgObserver.observe(img));

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('You are reading the heading :D');
// };
// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// directly added event listener to common parent element

// document.querySelectorAll('.nav__link').forEach((ev) => {
//   ev.addEventListener('click', function (el) {
//     el.addEventListener('click', function (e) {
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     })
//   }
// });
