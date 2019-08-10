import React from 'react';
import './App.css';
import { FaArrowLeft } from 'react-icons/fa';

import { SocialIcon } from 'react-social-icons';
import Welcome from './Welcome';
import Game from './Game';
import Result from './Result';
import reviews from './resources/reviews.json';
import filmtopp from './resources/filmtopp-c.svg'
class App extends React.Component {
  constructor(props) {
    super(props);
    const urls = ["https://open.spotify.com/show/2W6PLd6v21gyqaTZzfuMn4", "https://www.instagram.com/cinemacelsius/",
      "https://www.facebook.com/CinemaCelsius/"]
    this.socialIcons = urls.map((url) =>
      <SocialIcon key={url} className="social-media-content" url={url} />
    );

    this.moviesInGame = reviews.title.length;
    this.allMoviesIndex = [...Array(this.moviesInGame).keys()]
    this.allMovies = reviews.title; //Read all titles
    this.state = {
      view: 'welcome',
      enoughRated: false,
      movies: new Array(this.moviesInGame).fill(-1),
      titles: new Array(this.moviesInGame).fill(-1),
      temperatures: {},
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleTemperature = this.handleTemperature.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.statePropergation = {
      'show_result': 'show_game',
      'welcome': 'show_game',
      'show_game': 'show_result'
    }
    this.backwardStatePropergation = {
      'show_result': 'show_game',
      'welcome': 'welcome',
      'show_game': 'welcome'
    }
  }
  
  shuffle(array) {
    // Shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  resetGame() {
    const movies = this.shuffle(this.allMoviesIndex);
    const titles = movies.map(x => this.allMovies[x]);

    return {
      temperatures: {},//TODO do tuples!!! or hashmap
      movies: movies,
      titles: titles,
      enoughRated: false,
    }
  }

  getRandomIndex() {
    return Math.floor(Math.random() * reviews.title.length)
  }

  handleNextClick() {
    this.setState(state => {
      let gamestate = {}
      if(this.statePropergation[state.view] === 'show_game')
        gamestate = this.resetGame();
      return {
        view: this.statePropergation[state.view], 
        ...gamestate
      }
    });
  }

  handleBackClick() {
    this.setState(state => ({
      view: this.backwardStatePropergation[state.view],
    }));
  }

  handleTemperature(new_temp, index) {
    this.setState(state => {
      const temperatures = state.temperatures;
      temperatures[index] = new_temp;
      const enoughRated = Object.keys(temperatures).length > 5;

      return {
        temperatures: temperatures,
        enoughRated: enoughRated
      }
    });
  }



  render() {
    const view = this.state.view;

    let component;
    let back;
    let next;

    if (view === "show_result") {
      component = <Result temperatures={this.state.temperatures}/>;
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick} /></button>
      next = <button className="butn" onClick={this.handleNextClick} variant="outline-primary">Igen <span role="img" aria-label="Woho">🎉</span></button>
    } else if (view === "show_game") {
      component = <Game movies={this.state.movies} enoughRated={this.state.enoughRated} result={this.handleNextClick} titles={this.state.titles} temperatureHandler={this.handleTemperature} temperatures={this.state.temperatures} />
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick} /></button>
    } else {
      component = <Welcome />
      next = <button className="butn" onClick={this.handleNextClick} variant="outline-primary">Spela <span role="img" aria-label="Popcorn">🍿</span></button>
    }
    return (
      <div className="App">
        <header className="App-header">
          {back}
          {component}
          {next}
          <div id='social-media'>{this.socialIcons} 
          <a href="https://www.filmtopp.se/cinema-celsius-filmpodd/" id='filmtopp-link' className="social-icon social-media-content">
              <div className="social-container" id='filmtopp-container'>
              <img id='filmtopp' src={filmtopp} alt="filmtopp"/>
              </div>
            </a></div>
        </header>
        <iframe title="embedded_player" frameBorder="0" height="200" scrolling="no" src="https://embed.radiopublic.com/e?if=cinema-celsius-GZd9pJ" width="100%"></iframe>
      </div>
    );
  }
}


export default App;
