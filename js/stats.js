// const Parts = {
//     NOSE: 0,
//     L_EYE: 1,
//     R_EYE: 2,
//     L_EAR: 3,
//     R_EAR: 4,
//     L_SHOULDER: 5,
//     R_SHOULDER: 6
// }

// const NUM_PARTS = 14;


// let data = {
//     "score": 0.32371445304906,
//     "keypoints": [
//       {
//         "position": {
//           "y": 76.291801452637,
//           "x": 253.36747741699
//         },
//         "part": "nose",
//         "score": 0.99539834260941
//       },
//       {
//         "position": {
//           "y": 71.10383605957,
//           "x": 253.54365539551
//         },
//         "part": "leftEye",
//         "score": 0.98781454563141
//       },
//       {
//         "position": {
//           "y": 71.839515686035,
//           "x": 246.00454711914
//         },
//         "part": "rightEye",
//         "score": 0.99528175592422
//       },
//       {
//         "position": {
//           "y": 72.848854064941,
//           "x": 263.08151245117
//         },
//         "part": "leftEar",
//         "score": 0.84029853343964
//       },
//       {
//         "position": {
//           "y": 79.956565856934,
//           "x": 234.26812744141
//         },
//         "part": "rightEar",
//         "score": 0.92544466257095
//       },
//       {
//         "position": {
//           "y": 98.34538269043,
//           "x": 399.64068603516
//         },
//         "part": "leftShoulder",
//         "score": 0.99559044837952
//       },
//       {
//         "position": {
//           "y": 95.082359313965,
//           "x": 458.21868896484
//         },
//         "part": "rightShoulder",
//         "score": 0.99583911895752
//       },
//       {
//         "position": {
//           "y": 94.626205444336,
//           "x": 163.94561767578
//         },
//         "part": "leftElbow",
//         "score": 0.9518963098526
//       },
//       {
//         "position": {
//           "y": 150.2349395752,
//           "x": 245.06030273438
//         },
//         "part": "rightElbow",
//         "score": 0.98052614927292
//       },
//       {
//         "position": {
//           "y": 113.9603729248,
//           "x": 393.19735717773
//         },
//         "part": "leftWrist",
//         "score": 0.94009721279144
//       },
//       {
//         "position": {
//           "y": 186.47859191895,
//           "x": 257.98034667969
//         },
//         "part": "rightWrist",
//         "score": 0.98029226064682
//       },
//       {
//         "position": {
//           "y": 208.5266418457,
//           "x": 284.46710205078
//         },
//         "part": "leftHip",
//         "score": 0.97870296239853
//       },
//       {
//         "position": {
//           "y": 209.9910736084,
//           "x": 243.31219482422
//         },
//         "part": "rightHip",
//         "score": 0.97424703836441
//       },
//       {
//         "position": {
//           "y": 281.61965942383,
//           "x": 310.93188476562
//         },
//         "part": "leftKnee",
//         "score": 0.98368924856186
//       },
//       {
//         "position": {
//           "y": 282.80120849609,
//           "x": 203.81164550781
//         },
//         "part": "rightKnee",
//         "score": 0.96947449445724
//       },
//       {
//         "position": {
//           "y": 360.62716674805,
//           "x": 292.21047973633
//         },
//         "part": "leftAnkle",
//         "score": 0.8883239030838
//       },
//       {
//         "position": {
//           "y": 347.41177368164,
//           "x": 203.88229370117
//         },
//         "part": "rightAnkle",
//         "score": 0.8255187869072
//       }
//     ]
//   }

  let ctx = document.getElementById('myChart').getContext('2d');
  // statistics graphs 
//   let chart = new Chart(ctx, {
//       type: 'line', 
//       datasets: [{
//         x: 10,
//         y: 20
//       }, {
//         x: 15, 
//         y: 10
//       }], 
//       options: {
//           scales: {
//               yAxes: [{
//                   stacked: true
//               }]
//           }
//       }
//   });

let chartArr = [50, 25, 12, 19, 75];
console.log(percentages);
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: new Array(percentages.length).fill(''),
        datasets: [{
            data: percentages,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2
        }]
    },
    options: {
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    stepSize: 20
                },
                scaleLabel: {
                  display: true,
                  labelString: 'PostSure Percentage (%)',
                  fontStyle: 'bold'
                }, 
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }], 
            xAxes:[{
                scaleLabel: {
                    display: true, 
                    labelString: 'Time',
                    fontStyle: 'bold'
                }, 
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
        title: {
          display: true,
          text: 'Last Session Statistics',
          fontSize: 12
        },
    }
});



  // let total = 0;
  // let keypoints = new Array(NUM_PARTS).fill(0);
  // let goodPosture = 0;
  // let badPosture = 0;
  // function calibration(data, calibrating) {
  //   for(let i = 0; i < NUM_PARTS; i+= 2) {
  //       if(calibrating) {
  //           keypoints[i] += data.keypoints[i / 2].position.x;
  //           keypoints[i + 1] += data.keypoints[i / 2].position.y;
  //       }
  //   }
  //   total++;
  // }

  // function isGoodPosture(data) {
      
  // }

  // function average() {
  //     keypoints.forEach((val, ind) => {
  //         keypoints[ind] = val / total;
  //     })
  // }

  // function compareKeypoints() {
    // event listen for bad keypoints
    // update stats
  // }


  // let timeout = false;
  // setTimeout(function(){timeout=true},5000);
  // while(!timeout){
  //   calibration();
  //   console.log("Running!");
  // }
  // average();

  // run normally until stopped
  
