import { Menu } from "./menu.js";
import { ContactForm } from "./form.js";
import { Porfolio } from "./portfolio.js";
import { Router } from "./app/Router.js";

window.onload = () => {
  new Router();
  new Menu();
  new ContactForm();
  new Porfolio();
};
