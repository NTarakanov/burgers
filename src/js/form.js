(function () {
  const myForm = document.querySelector("#myForm");
  const send = document.querySelector("#sendBtn");
  let formData = new FormData(myForm);

  send.addEventListener("click", (event) => {
    event.preventDefault();

    if (validateForm(myForm)) {
      const data = {
        name: myForm.elements.name.value,
        phone: myForm.elements.phone.value,
        comment: myForm.elements.comment.value,
        to: "fox-race@mail.ru",
      };

      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          const element = data[k];
          console.log(data[k]);
          formData.append(k, element);
        }
      }

      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
      xhr.send(formData);
      xhr.addEventListener("load", (e) => {
        const formOverlay = document.createElement("div");
        formOverlay.classList.add("overlay");

        const formContainer = document.createElement("div");
        formContainer.classList.add("overlay__container");

        const formClose = document.createElement("a");
        formClose.classList.add("btn");
        formClose.textContent = "Закрыть";
        formClose.href = "#";

        const formText = document.createElement("div");
        formText.classList.add("overlay__text");

        let textOverlay = e.target.response.message;

        // console.log(textOverlay)
        formText.textContent = textOverlay;
        formOverlay.appendChild(formContainer);
        formContainer.appendChild(formText);
        formContainer.appendChild(formClose);

        document.querySelector(".request-section").appendChild(formOverlay);
        formClose.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(".request-section").removeChild(formOverlay);
        });
      });
    }
  });

  function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
      valid = false;
    }
    if (!validateField(form.elements.phone)) {
      valid = false;
    }
    if (!validateField(form.elements.comment)) {
      valid = false;
    }
    if (!validateField(form.elements.home)) {
      valid = false;
    }

    return valid;
  }

  function validateField(field) {
    if (!field.checkValidity()) {
      field.nextElementSibling.textContent = field.validationMessage;
      return false;
    } else {
      field.nextElementSibling.textContent = "";
      return true;
    }
  }
});
