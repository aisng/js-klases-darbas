import WaveSurfer from "../../../node_modules/wavesurfer.js/dist/wavesurfer.js";

export class AudioPlayer {
  constructor() {
    this.wavesurfer = WaveSurfer.create({
      container: "#audiowave",
      waveColor: "#f2a7a7",
      progressColor: "#C43E3E",
      height: 150,
      responsive: true,
      hideScrollbar: true,
      // cursorColor: "#910303","
      // cursorWidth: 2,
      plugins: [
        this.wavesurfer.cursor.create({
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
      $(".time-info").text(getTimeInfo());
    });

    this.wavesurfer.on("audioprocess", () => {
      $(".time-info").text(getTimeInfo());
    });

    $(".btn-toggle-pause").on("click", function () {
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

    $(".comments > button").on("click", () => {
      createCommentElement(this.wavesurfer.getCurrentTime());
    });
  }
  // const waveformContainer = $("#audiowave");

  // this could be refactored to a time converter func
  getTimeInfo() {
    let currentTime = this.wavesurfer.getCurrentTime();
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.round(currentTime - currentMin * 60);
    currentSec = (currentSec < 10 ? "0" : "") + currentSec;

    let duration = this.wavesurfer.getDuration();
    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.round(duration - durationMin * 60);
    durationSec = (durationSec < 10 ? "0" : "") + durationSec;

    return `${currentMin}:${currentSec}/${durationMin}:${durationSec}`;
  }

  createCommentElement(time) {
    const commentsElement = $(".comments");
    const commentDiv = $("<div>");
    const commentLabel = $("<label>");
    const commentInput = $("<input>");
    const commentBtnRemove = $("<button>");
    const commentBtnSubmit = $("<button>");

    commentDiv.addClass("comment");

    commentLabel.text(`Comment at ${time}`);
    commentLabel.attr("for", "comm1");

    commentInput.attr("type", "textarea");
    // commentInput.attr("class", "comment");

    commentBtnRemove.attr("class", "btn-del");
    commentBtnRemove.text("Delete");

    commentBtnSubmit.attr("class", "btn-post");
    commentBtnSubmit.text("Post");

    commentsElement.append(commentDiv);
    commentDiv.append(
      commentLabel,
      commentInput,
      commentBtnSubmit,
      commentBtnRemove
    );

    $(".btn-del").click((e) => {
      e.preventDefault();
      e.target.parentElement.remove();
    });

    $(".btn-post").on("click", (e) => {
      e.preventDefault();
      const commentInputValue = $(e.target).prev("input").val();
      const p = $("<p>").text(commentInputValue);
      commentInput.replaceWith(p);
      commentBtnSubmit.remove();
    });
  }
}
