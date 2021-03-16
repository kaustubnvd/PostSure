
import { renderCharts } from './stats.js';
import { getNet, getVideo, detectPose, pushStatistics } from './model.js';

const authScreen  = document.querySelector('.auth-screen');
const mainScreen  = document.querySelector('.main-screen');
const statsScreen = document.querySelector('.stats-screen');
const navigationBtns = document.querySelector('.nav-btns'),
        statsBtn     = document.getElementById('stats-btn'),
        minmaxBtn    = document.getElementById('minmax-btn');

export function main() {
  renderMainUI();
  Promise.all([getNet(), getVideo()]).then(([net, vidElement]) => {
    detectPose(vidElement, net);
    const seconds = 1000;
    const INTERVAL = 30 * seconds;                        // 30 sec
    setInterval(() => pushStatistics(), INTERVAL); // Push the percentages to firebase
  });
}

function renderMainUI() {
  authScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
  navigationBtns.classList.remove('hidden');
}

statsBtn.addEventListener('click', () => {
  mainScreen.classList.toggle('hidden');
  statsScreen.classList.toggle('hidden');
  minmaxBtn.classList.toggle('hidden');
  statsBtn.innerText = statsBtn.innerText === "Statistics" ? "Return": "Statistics";
  renderCharts();
});

minmaxBtn.addEventListener('click', () => {
  mainScreen.classList.toggle('hidden');
  statsBtn.classList.toggle('hidden');
  minmaxBtn.innerText = minmaxBtn.innerText === 'Minimize' ? 'Maximize' : 'Minimize';
});

// // function to reset user's lifetime array of data (dunno if it's right but attempted it)
// async function reset() {
//   docData.lifetime = [];
//   await db.collection("users").doc(`${email}`).update({
//     "lifetime": docData.lifetime
//     // "lifetime": firebase.firestore.FieldValue.arrayUnion(total),
//   });  
// }

// code for adding reset button for lifetime stats (once again not sure if I did it right but attempted it)
// resetBtn.addEventListener('click', function() {
//   popupEle.classList.toggle('hidden');
//   minimize.classList.toggle('hidden');
//   graphs.classList.toggle('hidden');
//   resetBtn.innerText = "Reset LifeTime Statistics";
//   reset();
// });


