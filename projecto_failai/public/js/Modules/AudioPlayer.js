export default class AudioPlayer {
  constructor() {
    this.wavesurfer = WaveSurfer.create({
      container: "#audiowave",
      waveColor: "#f2a7a7",
      progressColor: "#C43E3E",
      height: 150,
      responsive: true,
      hideScrollbar: true,
      plugins: [
        WaveSurfer.cursor.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            "background-color": "#000",
            color: "#fff",
            padding: "2px",
            "font-size": "10px",
          },
        }),
      ],
    });

    this.wavesurfer.cursor.formatTime = function formatTime(cursorTime) {
      cursorTime = isNaN(cursorTime) ? 0 : cursorTime;
      if (this.params.formatTimeCallback) {
        return this.params.formatTimeCallback(cursorTime);
      }
      return [cursorTime].map((time) =>
        [
          Math.floor((time % 3600) / 60), // minutes
          ("00" + Math.floor(time % 60)).slice(-2), // seconds
        ].join(":")
      );
    };

    this.wavesurfer.load("/static/boeing1.mp3");
    this.wavesurfer.setVolume(0.5);

    this.wavesurfer.on("ready", () => {
      $(".time-info").text(this.getTimeInfo());
    });

    this.wavesurfer.on("audioprocess", () => {
      $(".time-info").text(this.getTimeInfo());
    });

    $(".btn-toggle-pause").on("click", () => {
      this.wavesurfer.playPause();
      if (this.wavesurfer.isPlaying()) {
        $("#play-icon").attr("class", "fa fa-pause");
      } else {
        $("#play-icon").attr("class", "fa fa-play");
      }
    });

    $(".volume-control").on("change", () => {
      this.wavesurfer.setVolume($(".volume-control").val());
    });

    // $(".comments > button").on("click", () => {
    //   this.createCommentElement(this.wavesurfer.getCurrentTime());
    // });
  }

  getTimeInfo() {
    let currentTime = this.formatTime(this.wavesurfer.getCurrentTime());
    let duration = this.formatTime(this.wavesurfer.getDuration());

    return `${currentTime}/${duration}`;
  }

  formatTime(timeInMs) {
    let min = Math.floor(timeInMs / 60);
    let sec = Math.round(timeInMs - min * 60);
    sec = (sec < 10 ? "0" : "") + sec;
    return `${min}:${sec}`;
  }

  
}
