const Event = require("./eventmodel");
const User = require ("./usermodel");
const Favs = require("./favesmodel");

Event.belongsToMany(User, {
     
    through: Favs,
    foreignKey: "event_id"
});

User.belongsToMany(Event, {
    through: Favs,
    foreignKey: "user_id"
    
})

module.exports = {Event, User, Favs}