import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";
import Render from "../app/Render.js";
import Contacts from "../Pages/Contacts.js";

export default class ContactsController extends ControllerInterface {
  constructor() {
    super();
    this.api = new Api();
    this.render = new Render();
  }

  index(templateUrl) {
    this.api.get("/api/contacts").then((data) => {
      this.render.renderView(templateUrl, data, () => {
        new Contacts();
      });
    });
  }
}
