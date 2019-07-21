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
    this.moviesInGame = 5;
    this.allMovies = reviews.title; //Read all titles
    this.state = {
      view: 'welcome',
      allRated: false,
      movies: new Array(this.moviesInGame).fill(-1),
      titles: new Array(this.moviesInGame).fill(-1),
      temperature: new Array(this.moviesInGame).fill(-1),
      currentIndex: 0,
      reset: true
    };

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleTemperature = this.handleTemperature.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.statePropergation = {
      'show_result':'show_game',
      'welcome':'show_game',
      'show_game':'show_result'
    }
    this.backwardStatePropergation = {
      'show_result':'show_game',
      'welcome':'welcome',
      'show_game':'welcome'
    }
  }

  resetGame(){
    let movies;
    do {
      movies = new Array(this.moviesInGame).fill(0).map(this.getRandomIndex);
    } while (movies.length != new Set(movies).size);
    const titles = movies.map(x => this.allMovies[x]);

    this.setState(state => ({
      temperature:new Array(this.moviesInGame).fill(-1),
      movies: movies,
      titles: titles,
      reset:false
    }));
  }

  getRandomIndex(){
    return Math.floor(Math.random()*reviews.title.length) 
  }

  handleNextClick() {
    this.setState(state => ({
      view: this.statePropergation[state.view],
      reset: this.statePropergation[state.view] == 'show_game'
    }));
  }

  handleBackClick() {
    
    this.setState(state => ({
      view: this.backwardStatePropergation[state.view],
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
    if(this.state.reset)
      this.resetGame()

    const view = this.state.view;

    let component;
    let back;
    let next;

    if (view == "show_result") {
      component = <Result temperatures={this.state.temperature} movies={this.state.movies}/>;
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick} /></button>
      next = <button className="butn" onClick={this.handleNextClick} variant="outline-primary">Igen 🎉</button>
    } else if (view == "show_game") {
      component = <Game movies={this.state.movies} titles={this.state.titles} temperatureHandler = {this.handleTemperature} indexHandler = {this.handleIndex} index={this.state.currentIndex} temperature={this.state.temperature[this.state.currentIndex]}/>
      next = <button className="butn" disabled={!this.state.allRated} onClick={this.handleNextClick} variant="outline-primary">Visa resultat</button>
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick} /></button>
    } else {
      component = <Welcome />
      next = <button className="butn" onClick={this.handleNextClick} variant="outline-primary">Spela 🍿</button>
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
