var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

var W = 387;
var H = 218;
var gui, draw, PSS;

var chunks = [];


var general = {
  scale: 3.4,
  background_color: "#999",
  stroke_style: "blue",
  toggle_fullscreen: function() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  },
  download_json: function() {
    download();
  },
  start_recording: function() {
    startRecording();
  },
  stop_recording: function() {
    stopRecording();
  }
};

gui = new dat.GUI();
gui.add(general, 'toggle_fullscreen');
gui.add(general, 'start_recording');
gui.add(general, 'stop_recording');
gui.add(general, 'background_color').onChange(draw);
gui.add(general, 'stroke_style').onChange(draw);
gui.add(general, 'scale', 1, 8).onChange(draw);

function draw() {
  canvas.width = W*general.scale;
  canvas.height = H*general.scale;

  ctx.fillStyle = general.background_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  _.each(scale(PSS, general.scale), draw_points);
}

function startRecording() {
  chunks = [];
  recorder = new MediaRecorder(canvas.captureStream(60));
  recorder.ondataavailable = saveChunks;
  recorder.onstop = exportVideo;
  recorder.start();
}

function saveChunks(evt) {
  if (evt.data.size > 0) {
    chunks.push(evt.data);
  }

}
function stopRecording() {
    recorder.stop();
}

function exportVideo() {
  vid.src = URL.createObjectURL(new Blob(chunks));
}
