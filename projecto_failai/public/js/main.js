import { Menu } from "./Modules/Menu.js";
import Router from "./app/Router.js";

window.onload = () => {
  new Router();
  new Menu();
};
