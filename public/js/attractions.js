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



async function searchMe (event){
    event.preventDefault()
    try {
        let searchZip = document.getElementById("searchZip").value
        console.log(searchZip)
        const response = await fetch("/api/events/" +  searchZip , {
            method:"GET", 
            // body: JSON.stringify({
            //     zip: searchZip
            // }),
            headers: {"Content-Type": "application/json"}
            
        })
        const eventData = await response.json()
        console.log(eventData)
        var myCards = document.querySelector
        eventData.forEach(singleEvent => {
            myCards.innerHTML = `<div id="event-card">

            <a href="/singleAttraction/${singleEvent.id}"><h3 id="event-title">${singleEvent.title}</h3></a>
        
            <h4 id="event-date">${singleEvent.date}</h4>
        
            <p id="event-desc">${singleEvent.description}</p>
        
        <button class="fave" data-event_id=${singleEvent.id} data-user_id=${singleEvent.user_id}>Add to Favorites</button>
        </div>`
        })
        // console.log()
    } catch (error) {
    
        console.log(error)
        // document.location.replace("/login")
    }
} 
document.getElementById("searchButton").addEventListener("click", searchMe)
    
