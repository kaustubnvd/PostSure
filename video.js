var btn = document.getElementById('btn');
var video = document.getElementById('video');
btn.addEventListener('click', function () {
  chrome.notifications.create(
    'badPosture',
    {
      type: 'basic',
      iconUrl: '/images/chair256.png',
      title: 'Fix your posture!',
      message: 'Looks like you need to re-adjust your posture.',
    },
    function (msj) {
      setTimeout(function () {
        chrome.notifications.clear(msj);
      }, 4000);
    }
  );
});
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    //video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
  });
}
