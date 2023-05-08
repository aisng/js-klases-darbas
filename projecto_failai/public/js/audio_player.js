
let wavesurfer = WaveSurfer.create({
    container: "#audiowave",
    waveColor: "#C43E3E",
    progressColor: "#f2a7a7",
    height: 150,
    responsive: true,
    hideScrollbar: true,
    cursorColor: "#910303",
    cursorWidth: 2,
    barGap: 0,
    skipLength: 5
});

wavesurfer.load("/static/boeing1.mp3");
wavesurfer.setVolume(0.5);

let currentTime = wavesurfer.getCurrentTime();
let duration = wavesurfer.getDuration();

let timeInfo = `${currentTime}/${duration}`;
document.querySelector(".time-info").innerHTML = timeInfo;
// document.querySelector(".duration").innerHTML = duration;

$(".btn-toggle-pause").on("click", function () {
    wavesurfer.playPause();
    const playIcon = document.getElementById("play-icon");
    if (wavesurfer.isPlaying()) {
        playIcon.className = "fa fa-pause";
    } else {
        playIcon.className = "fa fa-play";
    };

});

$(".volume-control").on("change", function () {
    wavesurfer.setVolume(document.querySelector(".volume-control").value);
});






