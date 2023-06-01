export default class ContactForm {
  constructor() {
    $(".contact-form").on("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(document.querySelector(".contact-form"));
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      console.log(this);
      this.sendData(jsonData, "http://localhost:5000/receive_data");
      $(".contact-form").hide();
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
      .then((response) => response.json())
      .then((responseData) => this.displayData(responseData))
      .catch((error) => console.error(error));
  }

  displayData(data) {
    const dataJson = JSON.parse(data);
    $("#submitted-success").text("Žinutė išsiųsta!");
    $("#submitted-first-name").text("Vardas: " + dataJson.firstName);
    $("#submitted-last-name").text("Pavardė: " + dataJson.lastName);
    $("#submitted-course").text("Kursas: " + dataJson.course);
    $("#submitted-email").text("El. paštas: " + dataJson.email);
    $("#submitted-comment").text("Komentaras: " + dataJson.comment);
    $("#form-data").show();
  }
}
