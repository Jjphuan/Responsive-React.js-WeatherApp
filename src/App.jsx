import React, { useState } from 'react';
import './App.css';

function App() {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
  const getmonth = month[currentDate.getMonth()];
  const years = currentDate.getFullYear();
  const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const DayofWeeks = day[currentDate.getDay()];

  const [state,setState] = useState("");
  
  const handleSubmit = (e) => {e.preventDefault()};
  
  const fetchWeatherData = async (city) => {
    
    //change the first letter to uppercase
    const words = city.split(' ');
    const capitalizeW = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const result = capitalizeW.join(' ');
    city = result;
    
    const apiKey = "e15cc1a011e4576c8edb13300e32cb5e";
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}`;

    const weatherdisplay = document.getElementById("weatherdisplay");
    const displayerror = document.getElementById("displayerror");

    let response = await fetch(apiUrl);
    let data = await response.json();
    if(data.name === city){
      const humidity = document.getElementById("humidity");
      const temperature = document.getElementById("temperature");
      const wind = document.getElementById("wind");
      const airpressure = document.getElementById("airpressure");
      const visibility = document.getElementById("visibility");
      const state = document.getElementById("state");
      const weathericon = document.getElementById("icon");

      weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

      humidity.innerHTML = data.main.humidity+"%";
      temperature.innerHTML = (Math.floor(data.main.temp-273.15))+"°C";
      wind.innerHTML = data.wind.speed+" m/s";
      airpressure.innerHTML = data.main.pressure+" hPa";
      visibility.innerHTML = (data.visibility/1000)+" km";
      state.innerHTML = data.name;

      weatherdisplay.style.display = "block";
      displayerror.style.display = "none";
    }
    else{

      weatherdisplay.style.display = "none";
      displayerror.style.display = "block";
      displayerror.innerHTML = "Please enter city name";
    }
  }

  const handleclick = () => {setState(document.getElementById("gettext").value)}
  
  fetchWeatherData(state);

  return (
    <div className="weatherWrap">
      <div className="left">
        <form className="getweather" onClick={handleSubmit}>
          <div className="inputfield">
            <input type="text"
                    id="gettext"
                    className='gettext'
                    placeholder='Enter city name'
                    autoComplete='off'/>
          </div>
          <button className='getWeather' onClick={handleclick}>Get Weather</button>
        </form>
        <div className="weatherdisplay" id="weatherdisplay">
          <h1 className="state" id='state'>{state}</h1>
          <p className="tempdisplay" id='temperature'></p>
          <p className="displayicon" id='weathericon'>
            <img src="" alt="" id="icon" />
          </p>
          <p className="today">{DayofWeeks+","+date+" "+getmonth+" "+years} </p>
        </div>
        <p className="displayerror" id='displayerror'></p>
      </div>
      <div className="right">
        <div className="displayhumidity"><div className="wrap"><h2>Humidity</h2><br/><p id="humidity"></p></div></div>
        <div className="displaywind"><div className="wrap"><h2>Wind</h2><br/><p id="wind"></p></div></div>
        <div className="displaypressure"><div className="wrap"><h2>Air Pressure</h2><br/><p id="airpressure"></p></div></div>
        <div className="displayvisibility"><div className="wrap"><h2>Visibility</h2><br/><p id='visibility'></p></div></div>
      </div>
    </div>
  )
}

export default App
