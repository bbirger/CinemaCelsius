import React from 'react';
import Slider from 'react-input-slider';

import Posters from './index';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.getTemperature = this.getTemperature.bind(this);
        this.movies = props.movies.map((e, i) => {
            return <div key={i}>
                <img src={Posters[e]} alt='movie'/>
            </div>;
        })
        this.state = {
            currentSlide: 0
        };
        this.next = this.next.bind(this);
    }

    getTemperature() {
        const temp = this.props.temperatures[this.state.currentSlide];
        let temperature = " " + temp + "°C "
        // TODO: bucket and use a map for emoji
        
        if (temp === undefined){
            return '🎞🌡🤔';
        } else if (temp > 80) {
            temperature += "🔥";
        } else if (temp > 70) {
            temperature += "🙌";
        } else if (temp > 60) {
            temperature += "👀";
        } else if (temp > 50) {
            temperature += "🍿";
        } else if (temp > 30) {
            temperature += "😴";
        } else if (temp > 20) {
            temperature += "😭";
        } else {
            temperature += "🥶";
        }
        return temperature;
    }
    next = () => {
        this.setState(state => ({
            currentSlide: state.currentSlide + 1
        }));
    }

    prev = () => {
        this.setState(state => ({
            currentSlide: state.currentSlide - 1
        }));
    }

    updateCurrentSlide = (index) => {
        const { currentSlide } = this.state;
        if (currentSlide !== index) {
            this.setState({
                currentSlide: index
            });
        }
    }

    render() {
        let results;
        if(this.props.enoughRated)
            results = <button onClick={this.props.result} className="butn" variant="outline-primary">Visa resultat</button>;
        return (
            <div>
                <Carousel selectedItem={this.state.currentSlide} onChange={this.updateCurrentSlide} width="40vh" centerSlidePercentage={65} showIndicators={false} showStatus={false} showThumbs={false} showArrows={false}>                    
                    {this.movies}
                </Carousel>

                <Slider
                    axis="x"
                    xstep={1}
                    xmin={0}
                    xmax={100}
                    x={this.props.temperatures[this.state.currentSlide]}
                    onChange={({ x }) => {
                        this.props.temperatureHandler(x,this.state.currentSlide);
                    }}
                />
                <div>
                    <span role="img" aria-label="Temperature">{this.getTemperature()}</span>
                </div>                 
                    <button onClick={this.prev} className="butn" disabled={this.state.currentSlide === 0} variant="outline-primary">Föregående</button>
                    <button onClick={this.next} className="butn" disabled={this.state.currentSlide === this.movies.length-1} variant="outline-primary">Nästa</button>
                    {results}
            </div>
        );
    }
}

export default Game;
