const Event = require("./eventmodel");
const User = require ("./usermodel");
const Favs = require("./favesmodel");

Event.belongsToMany(User, {
    foreignKey: "event_id" , 
    through: Favs
});

User.belongsToMany(Event, {
    foreignKey: "user_id",
    through: Favs
})

module.exports = {Event, User, Favs}