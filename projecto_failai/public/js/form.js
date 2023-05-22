const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
  // let answerText =
  //     `Vardas: ${firstName}, pavardė: ${lastName}, el-paštas: ${email}, kursas: ${course}, komentaras: ${comment}`;

  // let formData = [{ "first_name": firstName }, { "last_name": lastName }, { "email": email }, { "course": course }, { "comment": comment }];
  //   sessionStorage.setItem("formData", jsonData);
  //   window.location.href = "atsakymas";

  sendData(jsonData, "http://localhost:5000/receive_data");
});

function sendData(data, url) {
  const options = {
    method: "PUT",
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
