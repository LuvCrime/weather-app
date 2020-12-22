import AppModules from "./AppModules.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { addData } from "../Redux/Actions";
import Loader from "react-loader-spinner";
const autoBind = require("auto-bind");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    autoBind(this);
  }

  componentDidMount() {
    this.getCity("moscow");
  }

  getWeekelyWeather() {
    const dataUrlWeeks = `https://api.openweathermap.org/data/2.5/onecall?lat=55.75&lon=37.62&&appid=eb93e97d16b687445b44bc92192ea7bb&units=metric`;
    fetch(dataUrlWeeks, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.props.addData(
          data.name,
          data.main.temp,
          data.weather[0].description,
          data.main.temp_min,
          data.main.temp_max
        );
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false,
        });
  })
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
        console.log(data);
        this.props.addData(
          data.name,
          data.main.temp,
          data.weather[0].description,
          data.main.temp_min,
          data.main.temp_max
        );
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
  }

  onSearchClick() {
    this.getCity(this.state.name);
    this.setState({
      name: ''
    })
  }

  render() {
    console.log(this.state.loading);
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
              <div className={AppModules.search}>
                <input
                  className={AppModules.textField}
                  value={this.state.name}
                  onChange={this.onInputOnChange}
                  placeholder='Enter a city'
                ></input>
                <div className={AppModules.icon} onClick={this.onSearchClick}>
                  <FontAwesomeIcon icon={faSearchLocation} />
                </div>
              </div>
              <div className={AppModules.wrapperWeather}>
                <div className={AppModules.name}>{this.props.name}</div>
                <div className={AppModules.cloud}>
                  {this.props.weather.capitalize()}
                </div>
                <div className={AppModules.degree}>
                  {Math.round(this.props.temp)}
                </div>
                <div className={AppModules.extraWeatherInfo}>
                  <div className={AppModules.min}>
                    Min: {Math.ceil(this.props.tempMin)}
                  </div>
                  <span>,</span>
                  <div className={AppModules.max}>
                    Max: {Math.ceil(this.props.tempMax)}
                  </div>
                </div>
              </div>
              <div className={AppModules.dayOftheWeek}>dayOftheWeek</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

const mapDispatchToProps = {
  addData: addData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
