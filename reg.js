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

   const response= await fetch(`http://recipe-server-steel.vercel.app/register`,{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify({name,age,dob,gender,email,password}),})
            .then(response=>response.json())
            .then(data=>{
                if(data.success){
                    alert('Registration Successful');
                    window.location.href = '/index.html';
                }
                else{
                    alert('Registration Failed');
                }
    
            })
            .catch(error=>console.error('Error:',error));
    
    });
  });
