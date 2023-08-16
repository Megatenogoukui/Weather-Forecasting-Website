import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const apiKey  = "bfc2f2f12952363b062ebaf94a5fc5e5"

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("" , async (req ,res) => {
    res.render("index.ejs");
    
})


app.post("/search", async (req, res) => {
    try {
        // Getting the location given by the user
        const location = (req.body.location).toUpperCase();


        // Getting the description and temperature 
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        const description = result.data.weather[0].description.replace(/^"|"$/g, "");
        const temperature = JSON.stringify(Math.round(result.data.main.temp - 273.15) + "°c").replace(/^"|"$/g, "");
        const humidity = JSON.stringify(result.data.main.humidity + "%").replace(/^"|"$/g, "");
        const windSpeed = JSON.stringify(result.data.wind.speed + "km/h").replace(/^"|"$/g, "");
        res.render("index.ejs" , { loca : location , des: description , temp : temperature , hum:humidity ,wind : windSpeed}); // Pass des and temp
    } catch (error) {
        console.log(error) // Pass empty values for des and temp
    }
});

app.listen(port , () => {
    console.log(`Listening to port : ${port}`)
})