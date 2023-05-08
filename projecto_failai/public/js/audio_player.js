let wavesurfer = WaveSurfer.create({
    container: "#audiowave",
    waveColor: "#C43E3E",
    progressColor: "#f2a7a7",
    height: 150,
    responsive: true,
    hideScrollbar: true,
    // cursorColor: "#910303",
    // cursorWidth: 2,
    plugins: [
        WaveSurfer.cursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '10px'
            },

        })
    ],
});

wavesurfer.cursor.formatTime = function formatTime(cursorTime) {
    cursorTime = isNaN(cursorTime) ? 0 : cursorTime;
    if (this.params.formatTimeCallback) {
        return this.params.formatTimeCallback(cursorTime);
    }
    return [cursorTime].map(time =>
        [Math.floor((time % 3600) / 60), // minutes
        ('00' + Math.floor(time % 60)).slice(-2), // seconds
        ].join(':')
    );
};



wavesurfer.load("/static/boeing1.mp3");
wavesurfer.setVolume(0.5);

function getTimeInfo() {
    let currentTime = wavesurfer.getCurrentTime();
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.round(currentTime - (currentMin * 60));
    currentSec = (currentSec < 10 ? '0' : '') + currentSec;

    let duration = wavesurfer.getDuration();
    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.round(duration - (durationMin * 60));
    durationSec = (durationSec < 10 ? '0' : '') + durationSec;

    let result = `${currentMin}:${currentSec}/${durationMin}:${durationSec}`;
    return result
};

let timeInfoElement = document.querySelector(".time-info");

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

wavesurfer.on('ready', function () {
    timeInfoElement.innerHTML = getTimeInfo();
});

wavesurfer.on('audioprocess', function () {
    timeInfoElement.innerHTML = getTimeInfo();
});







