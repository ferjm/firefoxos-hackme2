function vibrate() {
  if (!navigator.vibrate) {
    alert('Sorry vibration not supported in your device!');
    return;
  }

  // GO GO GO, check: https://developer.mozilla.org/en-US/docs/DOM/window.navigator.vibrate
  navigator.vibrate([200, 100, 200]);
}

function sendSMS() {
  if (!navigator.mozSms) {
    alert('Sorry you cannot send SMS with this! Get a Firefox OS phone!');
    return;
  }

  var phone = document.getElementById('phoneNumber').value;
  var text = document.getElementById('message').value;

  if (!phone || !text) {
    alert('Check those values ;P');
    return;
  }

  navigator.mozSms.send(phone, text);
}

function checkBatteryLevel() {
  if (!navigator.battery) {
    alert('Sorry no battery support for your device!');
    return;
  }

  // GO GO GO, check: https://developer.mozilla.org/en-US/docs/DOM/window.navigator.battery
  var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
  var display = document.getElementById('batteryLevel');

  function updateBatteryStatus() {
    display.innerHTML = battery.level * 100 + ' (' + (battery.charging ? 'charging' : 'not chargin') + ')'; 
  }

  battery.addEventListener("chargingchange", updateBatteryStatus);
  battery.addEventListener("levelchange", updateBatteryStatus);

  updateBatteryStatus();
}

function installApp() {
  if (!navigator.mozApps) {
    alert('Sorry, no apps api support, nothing to do here!');
    return;
  }

  // GO GO GO, check: https://developer.mozilla.org/en-US/docs/Apps/Apps_JavaScript_API
  // TODO, check this and set correctly the full path to your manifest
  var manifestURL = window.location.protocol + '//' + window.location.hostname + 'firefoxos-hackme2/manifest.webapp';
  navigator.mozApps.install(manifestURL);
}

window.addEventListener('load', function init() {
  document.getElementById('vibrateButton').onclick = vibrate;
  document.getElementById('sendSMSButton').onclick = sendSMS;
  document.getElementById('installAppButton').onclick = installApp;

  checkBatteryLevel();
});
