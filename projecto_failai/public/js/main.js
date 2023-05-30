import { Menu } from "./Modules/Menu.js";
import Router from "./app/Router.js";
// import ContactForm from "./contacts.js";
// import Porfolio from "./portfolio.js";
// import { AudioPlayer } from "./Modules/AudioPlayer.js";

window.onload = () => {
  new Router();
  new Menu();
  // new AudioPlayer();
  // new ContactForm();
  // new Porfolio();
};
