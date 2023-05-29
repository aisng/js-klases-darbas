import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";

export class IstorijaController extends ControllerInterface {
  index(pageUrl) {
    let api = new Api(pageUrl);
    api.loadPage(
      pageUrl,
      (pageContent) => {
        const parser = new DOMParser();
        const pageContentHtml = parser.parseFromString(
          pageContent,
          "text/html"
        );
        console.log(pageContentHtml);
        const mainContent = pageContentHtml.querySelector("main > *");
        console.log(mainContent);
        // $("main").html($(pageContentHtml).find("main").html());
        $("main").html(mainContent);
      },
      (error) => {
        console.error("Couldn't load content", error);
      }
    );
  }
}

export default IstorijaController;
