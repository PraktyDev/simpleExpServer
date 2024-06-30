const express = require("express")
const ip = require('ip')

const app = express()

function details(){
    return{
        location: "New York",
        temp: 11,
    };
}

app.get("/api/hello", (req, res) => {
    const visitor = req.query.visitor_name || "Guest"
    const client_ip = ip.address()
    const info = details()
    const greeting = `Hello, ${visitor}!, the temperature is ${info.temp} degree Celcius in ${info.location}`;
    res.json({ client_ip, location: info.location, greeting })
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})