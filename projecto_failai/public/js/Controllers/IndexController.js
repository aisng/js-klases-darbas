import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";

export class IndexController extends ControllerInterface {
  index(pageUrl) {
    let api = new Api();
    api.loadPage(pageUrl);
  }
}

export default IndexController;
