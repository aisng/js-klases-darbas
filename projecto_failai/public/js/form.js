const contactForm = document.querySelector(".contact-form");


function getFormData(event) {
    event.preventDefault();
};


contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // let formInputs = event.target.elements;

    // let firstName = formInputs.firstName.value;
    // let lastName = formInputs.lastName.value;
    // let email = formInputs.email.value;
    // let course = formInputs.course.value;
    // let comment = formInputs.course.value;

    const formData = new FormData(contactForm)
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
    // let answerText =
    //     `Vardas: ${firstName}, pavardė: ${lastName}, el-paštas: ${email}, kursas: ${course}, komentaras: ${comment}`;

    // let formData = [{ "first_name": firstName }, { "last_name": lastName }, { "email": email }, { "course": course }, { "comment": comment }];
    sessionStorage.setItem('formData', jsonData);
    window.location.href = 'atsakymas.html';
});

