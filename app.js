const express = require("express")
const dotenv = require('dotenv').config()

const app = express()
async function getLocation(){
    try{
        const response = await fetch(`https://ipinfo.io?token=${process.env.API_SECRET}`)
        const data = await response.json()
        return data
    }catch(err){
        console.error(err)
    }
}
async function getTemp(){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=auto:ip`)
        const data = await response.json()
        return data
    }catch(err){
        console.error(err)
    }
}

app.get("/api/hello", async (req, res) => {
    const visitor = req.query.visitor_name
    const client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try{
        const locale = await getLocation()
        const city = locale.city


        const temperature = await getTemp()
        const temp = temperature.current.temp_c

        const greeting = `Hello, ${visitor}!, the temperature is ${temp} degree Celcius in ${city}`;

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