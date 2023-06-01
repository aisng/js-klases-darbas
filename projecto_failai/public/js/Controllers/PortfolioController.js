import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";
import Render from "../app/Render.js";
import Portfolio from "../Pages/Portfolio.js";
import AudioPlayer from "../Modules/AudioPlayer.js";
import Comments from "../Modules/Comments.js";

export default class PortfolioController extends ControllerInterface {
  constructor() {
    super();
    this.api = new Api();
    this.render = new Render();
  }

  index(templateUrl) {
    this.api.get("/api/portfolio").then((data) => {
      this.render.renderView(templateUrl, data, () => {
        new Portfolio();
        let player = new AudioPlayer();
        let comments = new Comments();

        $(".comments > button").on("click", () => {
          let currentTime = player.formatTime(
            player.wavesurfer.getCurrentTime()
          );
          comments.createCommentElement(currentTime);
        });

        
      });
    });
  }
}
