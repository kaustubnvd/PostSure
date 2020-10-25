const videoHeight = 240;
const videoWidth = 320;
const calibrate = document.getElementById('calibrate');
var btn = document.getElementById('btn');
const loader = document.querySelector('.loader');
const popup = document.querySelector('.popup');
const minmax = document.getElementById('size');
const calibratedStatus = document.querySelector('.status');
const initPosturePoints = [];
let percentages = [];
let localPostures = [0, 0]; //goodPosture is index 0, badPosture is index 1
let globalPostures = [0, 0]; //

let color = 'green';
let isCalibrated = false;

calibrate.addEventListener('click', (event) => {
  isCalibrated = true;
  calibratedStatus.innerText = 'Calibrating...';
});

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

minmax.addEventListener('click', (e) => {
    popup.classList.toggle('hidden');
    minmax.innerText = minmax.innerText === 'Minimize' ? 'Maximize' : 'Minimize';
});

//Load in the neural network
async function getNet() {
  const net = await posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: 500,
    multiplier: 0.75,
    quantBytes: 2,
  });
  return net;
}

//util function from posenet repo -> removed gui/extraneous checks
function detectPose(video, net) {
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  let counter = 0;
  loader.style.display = 'none';
  let curPoints = [null, null, null, null, null, null, null];
  async function detectFrame() {
    const pose = await net.estimatePoses(video, {
      decodingMethod: 'single-person',
    });
    pose[0].keypoints.length = 7;
    //Clear out previous frame and redraw the video frame
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.save();
    ctx.scale(1, 1);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();
    //draw keypoints for the current frame's pose
    if(pose[0].score >= 0.1) {
      drawKeypoints(pose[0].keypoints, 0.5, ctx);
    }
    counter = handleFrame(pose, counter, curPoints); //handle each frame based on counter
    requestAnimationFrame(detectFrame); //requests browser to run callback given before repaint
  }
  detectFrame();
}

function handleFrame(pose, counter, curPoints) {
  if(isCalibrated) {
    //User has requested to calibrate -> parse pose values
    const { keypoints } = pose[0];
    if (counter <= 50) {
      //First 50 points used to generate "target" posture
      for (let i = 0; i < keypoints.length; i++) {
        if (curPoints[i] == null) {
          curPoints[i] = keypoints[i].position;
        }
        curPoints[i].x += keypoints[i].position.x;
        curPoints[i].y += keypoints[i].position.y;
      }
    } else {
      if (counter == 51) {
        //Target posture generated -> added to firebase for further analysis
        calibratedStatus.innerText = '✅ Calibrated';
        for (let i = 0; i < curPoints.length; i++) {
          curPoints[i].x /= 50;
          curPoints[i].y /= 50;
          initPosturePoints.push(curPoints[i]);
        }
      } else {
        //Handle poses normally -> reset curPoints and check
        if (counter % 50 == 0) {
          percentages.push(localPostures[0]/(localPostures[0] + localPostures[1]));
          globalPostures[0] += localPostures[0];
          globalPostures[1] += localPostures[1];
          localPostures = [0, 0];
        }
        getGoodPosture(keypoints.map(elem => elem.position));
      }
    }
    counter++;
  }
  return counter;
}

function getGoodPosture(curPoints) {
  let expShoulderDiff = [Math.abs(initPosturePoints[5].x - initPosturePoints[6].x), Math.abs(initPosturePoints[5].y - initPosturePoints[6].y)];
  let curShoulderDiff = [Math.abs(curPoints[5].x - curPoints[6].x), Math.abs(curPoints[5].y - curPoints[6].y)];
  for (let i = 0; i < curPoints.length; i++) {
    if (Math.abs(initPosturePoints[i].x - curPoints[i].x) > 175 || Math.abs(initPosturePoints[i].y - curPoints[i].y) > 100 || 
        Math.abs(expShoulderDiff[0] - curShoulderDiff[0]) > 40 || Math.abs(expShoulderDiff[1] - curShoulderDiff[1]) > 40) {
      if(color !== 'red') {
        color = 'red';
        btn.click();
      }
      localPostures[1]++;
      break;
    } else {
      color = 'green';
      localPostures[0]++;
    }
  }
}

async function getVideo() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available'
    );
  }
  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;
  //returns a MediaStream object based on MediaStreamConstraints (audio: false/{constraints}, video: false/{constraints})
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: 'user', width: videoWidth, height: videoHeight },
  });
  video.srcObject = stream;
  const loadedVideo = await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
  loadedVideo.play();
  return loadedVideo;
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.score < minConfidence || i == 1 || i == 2) {
      continue;
    }
    const { x, y } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 7, color); 
  }
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// main(net);
