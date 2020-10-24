chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //   // Not adding `{ audio: true }` since we only want video now
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then(function (stream) {
  //       // video.src = window.URL.createObjectURL(stream);
  //       // video.srcObject = stream;
  //       // video.play();
  //     });
  // }
}
