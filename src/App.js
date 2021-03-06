import React, { useState, useEffect } from 'react';
import './App.css';
const { key } = require('./key.json');
const localStorage = window.localStorage;

const App = () => {
  const [City, setCity] = useState(null);
  const [Search, setSearch] = useState(localStorage.getItem('Search'));
  const [Weather, setWeather] = useState(null);
  useEffect(() => {
    localStorage.setItem('Search', Search)
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${Search}&appid=${key}&units=metric`
      const response = await fetch(url);
      
      const resJson = await response.json();
      setCity(resJson.main);
      setWeather(resJson.weather)
    }
    fetchApi();
  }, [Search])


  return (
    <div className="App">
      <header className="App-header">
        <div className="firstdiv">
          <input type="text" onChange={(event) => {
            setSearch(event.target.value)
          }} />
        </div>
        {!City || !Weather ? (
          <p className='error'>Enter a City</p>
        ) : (
          <div className="seconddiv">
            <h2>{Search}</h2>
            <h3>Current Temperature: {City.temp} °C</h3>
            <p>Min  {City.temp_min} °C | Max {City.temp_max} °C</p>
            <p>{Weather[0].description}</p>
          </div>
        )
        }
      </header>
    </div>
  );
}

export default App;
