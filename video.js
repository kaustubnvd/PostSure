
var video = document.getElementById('video');
var net = getNet();
async function main(net) {
  net = await net;
  let vidElement = await getVideo();
  detectPose(vidElement, net);
}
main(net);
