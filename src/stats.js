import { email, db } from './user-auth.js';
import Chart from 'chart.js';


export async function getLifetime() {
    let userDoc = await db.collection('users').doc(`${email}`).get();
    let lifetimeArr = await userDoc.get('lifetime');
    return lifetimeArr;
}

export async function pushStats(currData, total) {
    await db.collection("users").doc(`${email}`).update({
        "lifetime": total
        // "lifetime": firebase.firestore.FieldValue.arrayUnion(total),
    });
    await db.collection("users").doc(`${email}`).update({
        "lastSession": currData
    });
}

//Update the DOM Chart elements from the firebase data
export async function getCharts() {
    let userDoc = await db.collection('users').doc(`${email}`).get();
    let docData = await userDoc.data();
    //get the CanvasRenderingContext2D objs for both charts
    let currCtx = document.getElementById('currChart').getContext('2d');
    let lifeCtx = document.getElementById('lifeChart').getContext('2d');
    getChart(currCtx, docData.lastSession, "Most Recent", 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
    getChart(lifeCtx, docData.lifetime, "Lifetime", 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
  }
  
function getChart(ctx, arr, name, backgroundColor, borderColor) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: new Array(arr.length).fill(''),
            datasets: [{
                data: arr,
                backgroundColor: [
                    backgroundColor,
                ],
                borderColor: [
                borderColor,
                ],
                borderWidth: 2
            }]
        },
        options: {
            elements: {
            points: {
                radius: 0
            }
            },
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
                        labelString: '',
                        fontStyle: 'bold'
                    }, 
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            title: {
            display: true,
            text: name,
            fontSize: 12
            },
        }
    }); 
}