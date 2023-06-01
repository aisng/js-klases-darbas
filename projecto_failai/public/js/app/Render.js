import Api from "./Api.js";

export default class Render {
  constructor() {
    this.api = new Api();
  }

  async renderView(templateUrl, data = [], callback = null) {
    // console.log(templateUrl, data);
    try {
      const content = await this.api.getText(templateUrl);
      // console.log(content);
      $("#app").html(this.replacePlaceholders(content, data));
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      console.error(new Error(), error);
    }
  }

  replacePlaceholders(str, obj) {
    const regex = /\[([^\]]+)]/g;
    return str.replace(regex, (_, prop) => {
      let value = obj;
      // console.log(value);
      const props = prop.split(".");
      if (value && value.hasOwnProperty(props[1])) {
        value = value[props[1]];
      } else {
        return "";
      }
      return value;
    });
  }
}
