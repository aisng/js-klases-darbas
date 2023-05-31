import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";
import Render from "../app/Render.js";

export default class HistoryController extends ControllerInterface {
  constructor() {
    super();
    this.api = new Api();
    this.render = new Render();
  }

  index(templateUrl) {
    this.api.get("/api/history").then((data) => {
      this.render.renderView(templateUrl, data);
    });
  }
}
