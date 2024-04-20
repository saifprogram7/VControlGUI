import React, { useState, useEffect } from 'react';
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faVolumeMute,
  faWifi,
  faSignal,
} from '@fortawesome/free-solid-svg-icons';
import { faBluetooth } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import VirtualAssistantImage from './assets/virtual-assistant-circle.png';
import motivationalQuotes from './motivation';

const Main = () => {
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  const logOutPage = () => {
    
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=London,UK&appid=ec2d27af588ad0b5f601193384191452`);
        const forecastData = response.data.list;

        const uniqueDays = {};
        const uniqueForecast = forecastData.filter(item => {
          const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
          if (!uniqueDays[forecastDate]) {
            uniqueDays[forecastDate] = true;
            return true;
          }
          return false;
        });

        setWeeklyForecast(uniqueForecast);
      } catch (error) {
        console.error('Error fetching weekly forecast:', error);
      }
    };

    fetchWeeklyForecast();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '64ca28abbd564fdbb891995d2cb0960d',
          },
        });

        const filteredArticles = response.data.articles.filter(article => article.content !== '[Removed]');
        setNews(filteredArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  function getCurrentTime() {
    const date = new Date();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }

  const menuItems = [
    { label: 'Stand By', color: '#4cdbff' },
    { label: 'Voice Recognition On', color: '#4cdbff' },
    { label: 'Voice Recognition Off', color: '#4cdbff' },
    { label: 'Advance Google Search', color: '#4cdbff' },
    { label: 'Money Management System', color: '#4cdbff' },
    { label: 'Alarm', color: '#4cdbff' },
    { label: 'Battery', color: '#4cdbff' },
    { label: 'Calendar', color: '#4cdbff' },
    { label: 'Camera', color: '#4cdbff' },
    { label: 'Chrome', color: '#4cdbff' },
    { label: 'Clock', color: '#4cdbff' },
    { label: 'Code Editor', color: '#4cdbff' },
    { label: 'Command Line', color: '#4cdbff' },
    { label: 'Comments', color: '#4cdbff' },
    { label: 'Discord', color: '#4cdbff' },
    { label: 'Email', color: '#4cdbff' },
    { label: 'File System', color: '#4cdbff' },
    { label: 'Folder System', color: '#4cdbff' },
    { label: 'Headphones', color: '#4cdbff' },
    { label: 'IP Address', color: '#4cdbff' },
    { label: 'Keyboard', color: '#4cdbff' },
    { label: 'Lightbulb', color: '#4cdbff' },
    { label: 'Location', color: '#4cdbff' },
    { label: 'Music', color: '#4cdbff' },
    { label: 'Powerpoint', color: '#4cdbff' },
    { label: 'Profile', color: '#4cdbff' },
    { label: 'Settings', color: '#4cdbff' },
    { label: 'Streamlabs', color: '#4cdbff' },
    { label: 'Tasks', color: '#4cdbff' },
    { label: 'Theme', color: '#4cdbff' },
    { label: 'Trello', color: '#4cdbff' },
    { label: 'Voice Recognition', color: '#4cdbff' },
    { label: 'Volume', color: '#4cdbff' },
    { label: 'Web Browser', color: '#4cdbff' },
    { label: 'Weather Forecast', color: '#4cdbff' },
    { label: 'Website URL', color: '#4cdbff' },
    { label: 'Widgets', color: '#4cdbff' },
    { label: 'Wi-Fi', color: '#4cdbff' },
    { label: 'Word', color: '#4cdbff' },
    { label: 'Youtube', color: '#4cdbff' },
    { label: 'Log Out', color: '#4cdbff', onClick: logOutPage }
  ];

  const [clickedButtons, setClickedButtons] = useState([]);

  const handleButtonClick = (label) => {
    setClickedButtons((prevButtons) => [...prevButtons, label]);
  };

  const renderWeeklyForecast = () => {
    if (!weeklyForecast.length) {
      return <div>No forecast available</div>;
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return weeklyForecast.map((forecast, index) => {
      const date = new Date(forecast.dt * 1000);
      const dayOfWeek = daysOfWeek[date.getDay()];

      const temperature = kelvinToCelsius(forecast.main.temp);
      const description = forecast.weather[0].description;
      return (
        <div key={index} className="forecast-item">
          <div className="forecast-day">{dayOfWeek}:</div>
          <div className='right-alignmentstyle'>
            <span className="temperature">{temperature}°C</span>
            <span className="description">, {description}</span>
          </div>
        </div>
      );
    });
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <>
      {/* Center Dashboard */}
      <div className="centerdashboard">
        {/* Icon Container */}
        <div className="iconContainer">
          <FontAwesomeIcon icon={faSignal} style={{ color: '#4cdbff' }} />
        </div>
        <h2 className="dashboardname">VControl Dashboard</h2>
        {/* Dashboard Icons */}
        <div className="dbicons">
          <FontAwesomeIcon icon={faWifi} className="dashboard-icon" />
          <FontAwesomeIcon icon={faBluetooth} className="dashboard-icon" />
          <FontAwesomeIcon icon={faVolumeMute} className="dashboard-icon" />
        </div>
      </div>

      {/* Monitor */}
      <div className="monitor">
        {/* Weather Forecast */}
        <div className="weather-forecast">
          <div className='alignment'>
            <h3>Weekly Weather Forecast:</h3>
            {renderWeeklyForecast()}
          </div>
        </div>
        {/* News Container */}
        <div className="newsContainer">
          <div className="newsTitleContainer">
            <p className="news">News:</p>
          </div>
          <div className="newsListContainer">
            {news.map((article, index) => (
              <div key={index} className="newsItem">
                <p className="newsTitle">{article.title}</p>
                <p className="newsDescription">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="image-container">
          <img src={VirtualAssistantImage} style={{ width: '30%', height: '50%' }} alt="Your Alt Text" />
        </div>
        {/* Bottom Info */}
        <div className="bottom-info">
          <div className="bottom-left">Current Date: {getCurrentDate()}</div>
          <div className="bottom-right">Current Time: {currentTime}</div>
        </div>
      </div>

      {/* Bottom Dashboard */}
      <div className="bottomdashboard">
        {/* Latest Commands */}
        <div className="command-history">
          <h2>Latest Command: {clickedButtons[clickedButtons.length - 1]}</h2>
        </div>
        <div className="power-off-button-container">
          <FontAwesomeIcon icon={faPowerOff} className="power-off-icon" />
        </div>
        <div className="motivational-quote-container">
          <p className="motivational-quote">Motivational Quote: {getRandomQuote()}</p>
        </div>
      </div>

      {/* Right Menu */}
      <div className="right-menu">
        {/* Icons Right */}
        <div className="icons-right">
          <div className="iconStructure">
            <h2 className="featuresName">Functionality</h2>
          </div>
        </div>
        {/* Buttons Container */}
        <div className="buttons-container">
          {menuItems.map((item, index) => (
            <button key={index} className="right-menu-button" onClick={() => handleButtonClick(item.label)}>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
