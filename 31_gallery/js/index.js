'use strict';

const el = document.getElementById('lightgallery');
const config = {
  mode: 'lg-zoom-in',
  backdropDuration: 500,
  // controls: false,
  counter: false,
  download: false,
  speed: 1000,
  // width: '300px',
  // height: '300px',
  // hideBarsDelay: 0,
  // hideControlOnEnd: true,
  // loop: false,
  thumbnail:true,
};

lightGallery(el, config);
