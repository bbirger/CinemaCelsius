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
            console.log(i)
            return <div key={i}>
                <img src={Posters[e]} alt='movie'/>
                <p className="legend">{props.titles[i]}</p>
            </div>;
        })
        
    }

    getTemperature() {
        const temp = this.props.temperature;
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

    render() {
        return (
            <div>
                <Carousel selectedItem={this.props.index}  useKeyboardArrows={true} width="40vh" centerSlidePercentage={80} showStatus={false} showThumbs={false} onChange={(index, e) => {
                    this.props.indexHandler(index);
                }}>
                    {this.movies}
                </Carousel>
                <Slider
                    axis="x"
                    xstep={1}
                    xmin={0}
                    xmax={100}
                    x={this.props.temperature}
                    onChange={({ x }) => {
                        this.props.temperatureHandler(x);
                    }}
                />
                <div><span role="img" aria-label="Temperature">{this.getTemperature()}</span></div>
            </div>

        );
    }
}

export default Game;
