const formEl = document.getElementById('js-form');
const thanksEl = document.getElementById('js-thanks');
const SEND_TARGET_NAME = 'send-target';

formEl.addEventListener('submit', () => {
  setSendTarget();
  setFormIframe();
});

// 他のページへ遷移時の処理設定
window.addEventListener('beforeunload', transitionStop);

function transitionStop(e) {
  e.preventDefault();
  e.returnValue = '';
}

function getTextValue(name) {
  const el = document.querySelector(`input[type=text][name='${name}']`);
  if (el.value) {
    return el.value;
  } else {
    return '';
  }
}

function getRadioValue(name) {
  const el = formEl[name];
  if (el.value) {
    return el.value;
  } else {
    return '';
  }
}

function getFormIframeUrl() {
  const baseUrl = 'https://docs.google.com/forms/u/0/d/e/[Google FormのID]/formResponse';
  const params = [
    // 各inputのnameと値
    `entry.2039833141=${getTextValue('entry.2039833141')}`,
    `entry.609974871=${getRadioValue('entry.609974871')}`,
    `entry.1158628209=${getRadioValue('entry.1158628209')}`,
  ];
  return baseUrl + '?' + params.join('&');
}

function setSendTarget() {
  const sendTarget = document.createElement('iframe');
  sendTarget.style.display = 'none';
  sendTarget.name = SEND_TARGET_NAME;
  formEl.appendChild(sendTarget);
}

function setFormIframe() {
  const formIframe = document.createElement('iframe');
  formIframe.style.display = 'none';
  formIframe.src = getFormIframeUrl();
  formEl.appendChild(formIframe);

  formIframe.addEventListener('load', () => {
    formEl.remove();
    thanksEl.style.display = 'block';
    window.removeEventListener('beforeunload', transitionStop, false);
  });
}
