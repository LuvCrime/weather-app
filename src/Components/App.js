import AppModules from "./AppModules.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { addData, addDataDailyWeather } from "../Redux/Actions";
import Loader from "react-loader-spinner";
const autoBind = require("auto-bind");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      suggest: "",
    };
    autoBind(this);
  }

  componentDidMount() {
    this.getCity("moscow");
  }

  getDailyWeather(lat, lon) {
    this.setState({
      loading: true,
    });
    const dataUrlWeeks = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=eb93e97d16b687445b44bc92192ea7bb&units=metric`;
    fetch(dataUrlWeeks, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((dataDailyWeather) => {
        function timeConverter(UNIX_timestamp) {
          var a = new Date(UNIX_timestamp * 1000);
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          var day = days[a.getDay()];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var time = date + " " + month + " " + year + " " + day;
          return time;
        }

        var weekWeather = dataDailyWeather.daily.slice(1).map((el) => {
          return { temp: el.temp.day, day: timeConverter(el.dt) };
        });

        this.props.addDataDailyWeather(weekWeather);

        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false,
        });
      });
  }

  getCity(cityName) {
    this.setState({
      loading: true,
    });
    const dataUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=eb93e97d16b687445b44bc92192ea7bb&units=metric`;
    fetch(dataUrl, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.addData(
          data.name,
          data.main.temp,
          data.weather[0].description,
          data.main.temp_min,
          data.main.temp_max,
          data.coord.lat,
          data.coord.lon,
          data.weather[0].icon
        );
        this.getDailyWeather(data.coord.lat, data.coord.lon);
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false,
        });
      });
  }

  onInputOnChange(e) {
    var currVal = e.target.value;
    this.setState({
      name: currVal,
    });
    var filtedCities = window.suggest.filter((city) => {
      return city.toLowerCase().startsWith(currVal.toLowerCase());
    });

    var mapped = filtedCities.map((city) => {
      return (
        <div
          className={AppModules.city}
          onClick={(event)=>this.onSuggestClick(event)}
          id={city}>
          {city}
        </div>
      );
    });
    this.setState({
      suggest: mapped.slice(0, 9),
    });
  }

  onSuggestClick(event) {
    var currCity = event.target.id;
    this.getCity(currCity);
    this.setState({
      suggest: '',
      name: '',
    });
  }

  onSearchClick() {
    this.getCity(this.state.name);
    this.setState({
      name: "",
    });
  }

  render() {
    const img = `http://openweathermap.org/img/wn/${this.props.icon}@2x.png`;

    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };

    if (this.state.loading && !this.props.name) {
      return (
        <div className={AppModules.loader}>
          <Loader
            type="Oval"
            color="#515ada"
            height={80}
            width={80}
            timeout={3000}
          />
        </div>
      );
    } else {
      return (
        <div className={AppModules.App}>
          <div className={AppModules.wrapper}>
            <div className={AppModules.weatherInfo}>
              <div className={AppModules.suggestList}>
                <div className={AppModules.search}>
                  <input
                    className={AppModules.textField}
                    value={this.state.name}
                    onChange={this.onInputOnChange}
                    placeholder="Enter a city"
                  ></input>
                  <div className={AppModules.icon} onClick={this.onSearchClick}>
                    <FontAwesomeIcon icon={faSearchLocation} />
                  </div>
                </div>
                {this.state.suggest && (
                  <div className={AppModules.suggest}>{this.state.suggest}</div>
                )}
              </div>
              <div className={AppModules.wrapperWeather}>
                <div className={AppModules.name}>{this.props.name}</div>
                <div className={AppModules.img}>
                  <img src={img} />
                </div>
                <div className={AppModules.cloud}>
                  {this.props.weather.capitalize()}
                </div>

                <div className={AppModules.degree}>
                  {Math.round(this.props.temp)}
                </div>
                <div className={AppModules.extraWeatherInfo}>
                  <div className={AppModules.min}>
                    Min: {Math.floor(this.props.tempMin)}
                  </div>
                  <span>,</span>
                  <div className={AppModules.max}>
                    Max: {Math.ceil(this.props.tempMax)}
                  </div>
                </div>
              </div>
              {this.props.week && (
                <div className={AppModules.dayOftheWeek}>
                  {this.props.week.map((item) => {
                    return (
                      <div key={item.day} className={AppModules.weekWeather}>
                        <div className={AppModules.day}>{item.day}</div>{" "}
                        <div className={AppModules.temp}>
                          {Math.round(item.temp)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  addData: addData,
  addDataDailyWeather: addDataDailyWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
