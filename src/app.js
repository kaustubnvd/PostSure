
import { getCharts, pushStats } from './stats.js';
import { getNet, getVideo, detectPose, globalPostures, percentages } from './model.js';

//getting DOM elements to manipulate
const popupEle = document.getElementById('video-mod');
const signUp = document.querySelector('.sign-up');
const statsDiv = document.getElementById('stats-div');
const minimize = document.getElementById('min');
const graphs = document.getElementById('graphs');
const popup = document.querySelector('.popup');
const minmax = document.getElementById('size');
const statsBtn = document.getElementById('stats-btn');

export async function main() {
  //Main Function started -> unhide video feed/buttons
  signUp.classList.add('hidden');
  popupEle.classList.remove('hidden');
  minimize.classList.remove('hidden');
  statsDiv.classList.remove('hidden');
  let net = await getNet(); //load posenet
  let vidElement = await getVideo();
  detectPose(vidElement, net);
  //Push the percentages to firebase 
  setInterval(() => {
    if((globalPostures[1] + globalPostures[0]) !== 0) {
      pushStats(percentages, 100*(globalPostures[0]/(globalPostures[1] + globalPostures[0])));
    }}, 30000);
}



// function to reset user's lifetime array of data (dunno if it's right but attempted it)
async function reset() {
  docData.lifetime = [];
  await db.collection("users").doc(`${email}`).update({
    "lifetime": docData.lifetime
    // "lifetime": firebase.firestore.FieldValue.arrayUnion(total),
  });  
}

//Switches to "statistics" screen -> hiding/unhiding DOM Elements
statsBtn.addEventListener('click', function() {
  popupEle.classList.toggle('hidden');
  minimize.classList.toggle('hidden');
  graphs.classList.toggle('hidden');
  statsBtn.innerText = statsBtn.innerText === "Statistics" ? "Return": "Statistics";
  getCharts();
});

minmax.addEventListener('click', (e) => {
  popup.classList.toggle('hidden');
  statsBtn.classList.toggle('hidden');
  minmax.innerText = minmax.innerText === 'Minimize' ? 'Maximize' : 'Minimize';
});

// code for adding reset button for lifetime stats (once again not sure if I did it right but attempted it)
// resetBtn.addEventListener('click', function() {
//   popupEle.classList.toggle('hidden');
//   minimize.classList.toggle('hidden');
//   graphs.classList.toggle('hidden');
//   resetBtn.innerText = "Reset LifeTime Statistics";
//   reset();
// });


//main(net);
