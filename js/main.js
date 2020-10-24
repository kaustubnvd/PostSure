//import * as posenet from '../node_modules/@tensorflow-models/posenet';
//import * as drawKeypoints from './util.js';


let imgElement = document.getElementById('video');
const videoHeight = 480;
const videoWidth = 640;
const color = 'black';
var net = getNet();
//Load in the neural network
async function getNet() {
    const net = await posenet.load({architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: 500,
        multiplier: 0.75,
        quantBytes: 2
    });
    return net;
}

async function main(net) {
    net = await net;
    let vidElement = await getVideo();
    let pose = await net.estimatePoses(vidElement, {decodeMethods: "single-person"});
    pose[0].keypoints.length = 7;
    console.log(pose);
    detectPose(vidElement, net);
}

//util function from posenet repo -> removed gui/extraneous checks
function detectPose(video, net) {
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    const flipPoseHorizontal = true;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    async function detectFrame() {
        net.dispose();
        net = await getNet();
        let poses = [];
        const pose = await net.estimatePoses(video, {decodingMethod: 'single-person'});
        pose[0].keypoints.length = 7;
        poses = poses.concat(pose);
        //Clear out previous frame and redraw
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.save();
        ctx.scale(1, 1);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();
        poses.forEach(({score, keypoints}) => {
            if(score >= 0.1) {
                drawKeypoints(keypoints, 0.50, ctx);
            }
            
        });
        requestAnimationFrame(detectFrame);
    }
    detectFrame();
}

async function getVideo() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
      }
    
    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;
    //returns a MediaStream object based on MediaStreamConstraints (audio: false/{constraints}, video: false/{constraints})
    const stream = await navigator.mediaDevices.getUserMedia({'audio': false, 'video': {facingMode: 'user', width: videoWidth, height: videoHeight}});
    video.srcObject = stream;
    const loadedVideo = await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
    });
    loadedVideo.play();
    return loadedVideo;
}

export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
      const keypoint = keypoints[i];
      if (keypoint.score < minConfidence) {
        continue;
      }
      const {x, y} = keypoint.position;
      drawPoint(ctx, (y * scale), (x * scale), 3, color);
    }
}

export function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

main(net);
