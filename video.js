
var video = document.getElementById('video');
var net = getNet();

const popupEle = document.getElementById('video-mod');
const signUp = document.querySelector('.sign-up');
const minimize = document.getElementById('min');
async function main(net) {
  signUp.classList.add('hidden');
  popupEle.classList.remove('hidden');
  minimize.classList.remove('hidden');
  net = await net;
  let vidElement = await getVideo();
  detectPose(vidElement, net);
}
//main(net);
