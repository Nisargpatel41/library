$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 500) {
      $(".header-default").css("background", "#2c2d31");
    } else {
      $(".header-default").css("background", "transparent");
    }
  });
});

const loader = document.querySelector(".loader-overlay");
const nameInput = document.querySelector(".name-input");
const phoneInput = document.querySelector(".phone-input");
const emailInput = document.querySelector(".email-input");

const nameError = document.querySelector(".name-error");
const phoneError = document.querySelector(".phone-error");
const emailError = document.querySelector(".email-error");

const handleSubmit = (e) => {
  e.preventDefault();

  if (isValidForm()) {
    let data = {
      userName: nameInput.value,
      userPhone: phoneInput.value,
      createdAt: new Date(),
    };
    if (emailInput.value) {
      data["userEmail"] = emailInput.value;
    }

    loader.style.display = "block";
    axios
      .post("http://localhost:5000/api/contact", data)
      .then((res) => {
        loader.style.display = "none";
        console.log(res);
      })
      .catch((err) => {
        loader.style.display = "none";
        console.log(err);
      });
  }
};

const isValidForm = () => {
  if (!nameInput || !nameInput.value) {
    nameError.innerHTML = "Please enter name";
    return false;
  } else if (!phoneInput || !phoneInput.value) {
    nameError.innerHTML = "";
    phoneError.innerHTML = "Please enter phone number";
    return false;
  } else if (phoneInput && !/^[5-9]\d{9}$/.test(phoneInput.value)) {
    phoneError.innerHTML = "Please enter valid phone number";
    return false;
  } else if (
    emailInput &&
    emailInput.value &&
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)
  ) {
    phoneError.innerHTML = "";
    emailError.innerHTML = "Please enter valid email";
    return false;
  }
  phoneError.innerHTML = "";
  emailError.innerHTML = "";
  return true;
};
