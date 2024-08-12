document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(name, email, password);

    try {
      const response = await fetch("https://recipe-server-steel.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = "/home.html";
      } else {
        console.error("error occured");
        alert("You are not a User Please Register");
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  });
