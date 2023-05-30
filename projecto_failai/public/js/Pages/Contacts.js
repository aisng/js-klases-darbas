export default class ContactForm {
  constructor() {
    $(document).on("submit", ".contact-form", (e) => {
      e.preventDefault();

      const formData = new FormData(document.querySelector(".contact-form"));
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      console.log(this);
      this.sendData(jsonData, "http://localhost:5000/receive_data");
    });
  }

  sendData(data, url) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
}
