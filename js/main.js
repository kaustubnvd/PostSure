const posenet = require('@tensorflow-models/posenet');



async function temp(img) {
    const net = await posenet.load({architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75,
        fliphorizontal: false
    });
}

const pose = temp(imgElement);

console.log(pose);
