const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-150%";
  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

// Send data to user file
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", handleForm);
});

async function handleForm(ev) {
  ev.preventDefault(); // This lets JS handle the form and prevents the page from reloading
  let form = ev.target; // ev.target is the form
  let formData = new FormData(form);

  // convert form data to JSON
  const entries = formData.entries();
  const data = Object.fromEntries(entries);

  // load the existing JSON data from the file
  fetch("../users/users.json")
    .then((response) => response.json())
    .then((existingData) => {
      // append the new data to the existing data
      const newData = { ...existingData, ...data };
      // save the updated data to the file
      fetch("../users/users.json", {
        method: "PUT",
        body: JSON.stringify(newData),
      })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}
