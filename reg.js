document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    console.log("🚀 ~ .addEventListener ~ name:", name);
    const age = document.getElementById("age").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    console.log("🚀 ~ .addEventListener ~ email:", email);
    const password = document.getElementById("password").value;
    console.log("🚀 ~ .addEventListener ~ password:", password);

    try {
      const response = await fetch("https://recipe-server-steel.vercel.app/register", {
        method: "POST",
        // mode:"no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, dob, gender, email, password }),
      });
      const data = await response.json();
      console.log(response, data); // Log the raw response object

      if (data.success) {
        alert("Registration Successful");
        window.location.href = "/index.html"; // Redirect to login page after registration
      } else {
        alert("Registration Failed: " + data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Registration Failed: Error occurred");
    }
  });
