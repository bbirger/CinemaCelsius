import React from 'react';
import './App.css';
import { FaArrowLeft } from 'react-icons/fa';

import { SocialIcon } from 'react-social-icons';
import Welcome from './Welcome';
import Game from './Game';
import Result from './Result';
import reviews from './resources/reviews.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    const urls = ["https://open.spotify.com/show/2W6PLd6v21gyqaTZzfuMn4", "https://www.instagram.com/cinemacelsius/",
      "https://www.facebook.com/CinemaCelsius/", , "https://www.filmtopp.se/cinema-celsius-filmpodd/"]
    this.socialIcons = urls.map((url) =>
      <SocialIcon key={url} className="social-media-content" url={url} />
    );
    const moviesInGame = 5;
    this.allMovies = reviews.title; //Read all titles
    this.movies =  new Array(moviesInGame).fill(0).map(this.getRandomIndex);
    this.titles = this.movies.map(x => this.allMovies[x])
    this.state = { view: 'show_result' ,
                  allRated:false,
                  temperature:new Array(moviesInGame).fill(-1),
                  currentIndex: 0,
                  indexMap: this.movies,
                  consumedMovies: this.movies
    };

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
  }

  getRandomIndex(){
    return 0;//Math.floor(Math.random()*reviews.title.length) 
  }

  handleNextClick() {
    this.setState(state => ({
      view: 'show_result'
    }));
  }

  handleBackClick() {
    this.setState(state => ({
      view: 'Welcome'
    }));
  }

  handleTemperature(new_temp) {
    this.setState(state => {
      const temperature = state.temperature;
      temperature[state.currentIndex] = new_temp
      const allRated = !temperature.includes(-1)

      return {
        temperature: temperature,
        allRated: allRated
      }
    });
  }

  handleIndex(index) {
    this.setState(state => ({
      currentIndex: index
    }));
  }

  render() {
    const view = this.state.view;

    let component;
    let back;
    let next;

    if (view == "show_result") {
      component = <Result temperatures={this.state.temperature} movies={this.movies}/>;
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick} /></button>
    } else if (view == "show_game") {
      component = <Game movies={this.movies} titles={this.titles} temperatureHandler = {this.handleTemperature} indexHandler = {this.handleIndex} index={this.state.currentIndex} temperature={this.state.temperature[this.state.currentIndex]}/>
      next = <button className="butn" disabled={!this.state.allRated} onClick={this.handleNextClick} variant="outline-primary">Show results</button>
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick} /></button>
    } else {
      component = <Welcome />
      next = <button className="butn" onClick={this.handleNextClick} variant="outline-primary">Press to play 🍿</button>
    }
    return (
      <div className="App">
        <header className="App-header">
          {back}
          {component}
          {next}
          <div id='social-media'>{this.socialIcons}</div>
        </header>
      </div>
    );
  }
}


export default App;
