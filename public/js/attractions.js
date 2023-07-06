async function addToFaves(){
    try {
        const response = await fetch ("/api/users/faves", {
            method: "POST",
            body: JSON.stringify({
                eventId: this.dataset.event_id,
                userId: "1" //hard coded user id needs to be changed 
            }),
            headers: {"Content-Type": "application/json"}
        }) 
        document.location.replace("/api/users/faves")
    } catch (error) {
        console.log(error)
        document.location.replace("/login")
    }
} 

Array.from(document.querySelectorAll(".fave")).forEach(el => el.addEventListener("click", addToFaves))

