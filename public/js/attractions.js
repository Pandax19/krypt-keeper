async function addToFaves() {
    const faveBtn = this.document.querySelector(".fave")
    try {
        const response = await fetch("/api/users/myfaves", {
            method: "POST",
            body: JSON.stringify({
                eventId: faveBtn.dataset.event_id,
                userId: faveBtn.dataset.user_id
            }),
            headers: { "Content-Type": "application/json" }
        })
        document.location.replace("/myfaves")
    } catch (error) {
        console.log(error)
        document.location.replace("/login")
    }
}





async function searchMe(event) {
    event.preventDefault()
    try {
        let searchZip = document.getElementById("searchZip").value
        console.log(searchZip)
        const response = await fetch("/api/events/" + searchZip, {
            method: "GET",
            // body: JSON.stringify({
            //     zip: searchZip
            // }),
            headers: { "Content-Type": "application/json" }

        })
        const eventData = await response.json()
        // console.log("START")
        console.log(eventData.length)
        // console.log("END")
        var myCards = document.querySelector("#myCards")
        myCards.innerHTML = ""
        eventData.forEach(singleEvent => {
            if (singleEvent.zip == searchZip) {


                myCards.innerHTML += `<div id="event-card">

            <a href="/singleAttraction/${singleEvent.id}"><h3 id="event-title">${singleEvent.title}</h3></a>
        
            
        
            <p id="event-desc">${singleEvent.description}</p>
        
        <button class="fave" onclick="addToFaves(this)" data-event_id=${singleEvent.id} data-user_id=${singleEvent.user_id}>Add to Favorites</button>
        </div>`
            }
        })
        if(eventData.length == 0){
            myCards.innerHTML = `<p>No results Found</p>`
        }
        // console.log()
    } catch (error) {

        console.log(error)
        // document.location.replace("/login")
    }
}
try {
document.getElementById("searchButton").addEventListener("click", searchMe)
    
} catch (error) {
    
}


Array.from(document.querySelectorAll(".fave")).forEach(el => el.addEventListener("click", addToFaves))