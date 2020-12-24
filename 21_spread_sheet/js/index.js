function test(val) {
  console.log('開始');
  const url = 'https://script.google.com/macros/s/AKfycbxexjBpS_ww7Kmnyy-XWpAZg8z0XXOu1bmt4-dGqAsfJdpJZ8AfWkQGIA/exec';

  fetch(`${url}?value=${val}`, {
    mode: 'cors'
  })
    .then(res => {
      console.log(res);
    });
}
