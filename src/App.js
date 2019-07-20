import React from 'react';
import './App.css';
import { FaArrowLeft } from 'react-icons/fa';

import { SocialIcon } from 'react-social-icons';
import Welcome from './Welcome';
import Game from './Game';
import Result from './Result';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {view:'show_game'};
      const urls = ["https://open.spotify.com/show/2W6PLd6v21gyqaTZzfuMn4", "https://www.instagram.com/cinemacelsius/",
      "https://www.facebook.com/CinemaCelsius/", , "https://www.filmtopp.se/cinema-celsius-filmpodd/"]
      this.socialIcons = urls.map((url) =>
      <SocialIcon key={url} className="social-media-content" url={url} />
    );
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleNextClick() {
    console.log();
    this.setState(state => ({
      view: 'show_game'
    }));
  }

  handleBackClick() {
    console.log();
    this.setState(state => ({
      view: 'Welcome'
    }));
  }
  
  render() {
    const view = this.state.view;
    console.log(view);
    let component;
    let back;
    let next;
    if(view == "show_result"){
      component = <Result/>;
      back = <FaArrowLeft id='back-button' onClick={this.handleBackClick}/>
    } else if(view == "show_game"){
      console.log(view)
      component = <Game/>
      next = <button class="butn"  onClick={this.handleNextClick} variant="outline-primary">Show results</button>
      back = <button id='back-button'  ><FaArrowLeft className="button" onClick={this.handleBackClick}/></button>

    } else {
      component=<Welcome/>
      next = <button class="butn" onClick={this.handleNextClick} variant="outline-primary">Press to play 🍿</button>
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
