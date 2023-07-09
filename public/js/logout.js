document.querySelector("#logout").addEventListener("click", logout)

async function logout(){
    try {
        const response = await fetch("/api/users/logout", {
            method: "POST"
        })
        if (response.ok) {
            console.log("log out!!")
            document.location.replace("/")
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


