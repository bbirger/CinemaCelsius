import React from 'react';
import Slider from 'react-input-slider';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

import Posters from './index';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactDOM from 'react-dom';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.getTemperature = this.getTemperature.bind(this);
        this.movies = props.movies.map((e, i) => {
            console.log(i)
            return <div key={i}>
                <img src={Posters[e]} alt='movie'/>
                <p className="legend">{props.titles[i]}</p>
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
        if (temp > 80) {
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

        return (
            <div>
                <Carousel selectedItem={this.state.currentSlide} onChange={this.updateCurrentSlide} width="40vh" centerSlidePercentage={80} showStatus={false} showThumbs={false} showArrows={false}>                    
                    {this.movies}
                </Carousel>

                <Slider
                    axis="x"
                    xstep={1}
                    xmin={0}
                    xmax={100}
                    x={this.props.temperatures[this.state.currentSlide]}
                    onChange={({ x }) => {
                        console.log(x)
                        this.props.temperatureHandler(x,this.state.currentSlide);
                    }}
                />
                <div>
                    <span role="img" aria-label="Temperature">{this.getTemperature()}</span>
                </div>                 
                    <button onClick={this.prev} className="butn" disabled={this.state.currentSlide == 0} variant="outline-primary">Föregående</button>
                    <button onClick={this.next} className="butn" disabled={this.state.currentSlide == this.movies.length-1} variant="outline-primary">Nästa</button>
            </div>
        );
    }
}

export default Game;
