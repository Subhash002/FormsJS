const formEl = document.querySelector("form");
const emailFld = document.querySelector("input[name='email']");
const passwordFld = document.querySelector("input[name='password']");
const repasswordFld = document.querySelector("input[name='repassword']");
const fullnameFld = document.querySelector("input[name='fullname']");
const merchantFld = document.querySelector("input[name='merchant']");
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

let canSubmit = false;

const submitForm = (data) => {};

// validators

const validateFld = (el, condition) => {
  if (condition) {
    canSubmit = true;
    el.parentElement.classList.remove("form-field-error");
  } else {
    canSubmit = false;
    el.parentElement.classList.add("form-field-error");
  }
};

emailFld.addEventListener("keyup", function (e) {
  e.preventDefault();
  validateFld(this, e.target.reportValidity());
});

passwordFld.addEventListener("keyup", function (e) {
  e.preventDefault();
  validateFld(this, passwordRegEx.test(e.target.value));
});

repasswordFld.addEventListener("keyup", function (e) {
  e.preventDefault();
  validateFld(this, passwordFld.value === e.target.value);
});

fullnameFld.addEventListener("keyup", function (e) {
  e.preventDefault();
  validateFld(this, e.target.reportValidity());
});

// emailFld.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   if (e.target.reportValidity) {
//     canSubmit = true;
//     this.parentElement.classList.remove("form-field-error");
//   } else {
//     canSubmit = false;
//     this.parentElement.classList.add("form-field-error");
//   }
// });

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const getFormValues = [...e.target.elements]
    .filter((el) => el.type !== "submit" && el)
    .map((el) => {
      return {
        name: el.getAttribute("name"),
        type: el.type,
        value: el.type === "checkbox" ? el.checked : el.value,
      };
    });
  console.log(getFormValues);
  const isFilled = getFormValues
    .filter((el) => el.type !== "checkbox")
    .every((el) => el.value !== "");
  isFilled && canSubmit && submitForm(getFormValues);
});
