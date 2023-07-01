const loginFormHandler = async e => {
    e.preventDefault()
    const username = document.getElementById("username-login").value.trim()
    const password = document.getElementById("password-login").value.trim()
    if (username && password){
        // const response = await fetch("/api/users/login", {
            const response = await fetch("/userRoutes/login", {
            method: "POST",
            body: JSON.stringify({username, password}), 
            headers: {"Content-Type": "application/json"}
        })
        console.log(response)
        if(response.ok){
            document.location.replace("/")
        } else {
            alert(response.statusText)
        }
    }
}
loginFormHandler()

document.querySelector("#login-form").addEventListener("submit", loginFormHandler)