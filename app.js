const express = require("express")
const ip = require('ip')
const axios = require('axios')
const dotenv = require('dotenv').config()

const app = express()

const client_ip = ip.address()
async function getLocation(){
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IP_API_SECRET}&ipAddress=${client_ip}`)
    return response.data
}

app.get("/api/hello", async (req, res) => {
    const visitor = req.query.visitor_name || "Mark"

    try{
        const locale = await getLocation()
        const city = locale.location.city || "New York"
        const greeting = `Hello, ${visitor}!, the temperature is 11 degree Celcius in ${city}`;
        res.json({ client_ip, location: city, greeting })
    } catch(err){
        console.log(err)
        res.status(500).json({ message: 'An Error Occured ' + err.message})
    }
})

const port = process.env.PORT || "3000"
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})