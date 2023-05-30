import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";

export default class HistoryController extends ControllerInterface {
  index(pageUrl) {
    let api = new Api();
    api.loadPage(pageUrl);
  }
}
