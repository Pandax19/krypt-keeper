document.querySelector("#logout").addEventListener("click", logout)

async function logout(){
    try {
        const response = await fetch("/api/users/logout", {
            method: "POST"
        })
        if (response.ok) {
            document.location.replace("/")
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


console.log("log out!!")