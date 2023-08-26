function onSubmit(e) {
  e.preventDefault();
  const form = document.forms["form"];
  validate(form);
}

function validate(form) {
  const inputElements = document.querySelectorAll("input");
  inputElements.forEach((element) => {
    addErrorElement(element);
    addErrorEventListener(element, element.id);
  });
}

function addErrorElement(input) {
  const element = document.createElement("p");
  element.innerHTML = "This is required field.";
  element.classList.add("error-text");
  element.classList.add("hidden");
  input.parentNode.appendChild(element);
}

function hideElement(element) {
  element.classList.add("hidden");
  element.classList.remove("display");
}

function showElement(element) {
  element.classList.remove("hidden");
  element.classList.add("display");
}

function addErrorEventListener(input, type) {
  switch (type) {
    case "name":
      input.addEventListener("input", () => {
        const value = input.value;
        const errorElement = input.parentNode.querySelector("p");
        if (value && value.length >= 3) {
          hideElement(errorElement);
        } else {
          showElement(errorElement);
          errorElement.innerText = "Username must be atleast 3 characters.";
        }
      });
      break;
    case "email":
      input.addEventListener("input", function () {
        const value = input.value;
        const errorElement = input.parentNode.querySelector("p");
        if (value && value.includes("@") && value.endsWith(".com")) {
          hideElement(errorElement);
        } else {
          showElement(errorElement);
          errorElement.innerText = "Email is invalid.";
        }
      });
      break;
    case "password":
      input.addEventListener("input", function () {
        const value = input.value;
        const errorElement = input.parentNode.querySelector("p");
        const confirmPasswordValue =
          document.getElementById("confirm-password").value;
        if (value >= 6 && value === confirmPasswordValue) {
          hideElement(errorElement);
        } else {
          showElement(errorElement);
          if (value < 6) {
            errorElement.innerText = "Password must be at least 6 characters.";
          } else {
            errorElement.innerText = "Password2 is not same";
          }
        }
      });
      break;
    case "confirm-password":
      input.addEventListener("input", function () {
        const value = input.value;
        const errorElement = input.parentNode.querySelector("p");
        const passwordValue = document.getElementById("password").value;
        if (value && value === passwordValue) {
          hideElement(errorElement);
        } else {
          showElement(errorElement);
          if (!value) {
            errorElement.innerText = "This is required.";
          } else {
            errorElement.innerText = "Password is not same";
          }
        }
      });
      break;
    default:
      console.log("error");
      break;
  }
}
