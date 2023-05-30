import Api from "./Api.js";

export default class Render {
  constructor() {
    this.api = new Api();
  }

  async renderView(templateUrl, data) {
    console.log(templateUrl);
    try {
      const content = await this.api.getText(templateUrl);
      $("#app").html(this.replacePlaceholders(content, data));
      console.log(content);
      //   document.querySelector("#app").innerHTML = this.replacePlaceholders(
      //     content,
      //     data
      //   );
    } catch (error) {
      console.error(new Error(), error);
    }
  }

  replacePlaceholders(str, obj) {
    const regex = /\[([^\]]+)]/g;
    return str.replace(regex, (_, prop) => {
      let value = obj;
      const props = prop.split(".");
      if (value && value.hasOwnProperty(props[1])) {
        value = value[props[1]];
      } else {
        return ""; // Return an empty string if any property is missing
      }
      return value;
    });
  }
}
