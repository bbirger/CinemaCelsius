import React from 'react';
import Slider from 'react-input-slider';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { temperature: 50 };
        this.getTemperature = this.getTemperature.bind(this);
    }

    getTemperature() {
        const temp = this.state.temperature;
        let temperature = " " + temp + "°C "
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
        //Key: c73e5eb
        const slickSliderSettings = {
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <Carousel centerSlidePercentage= {80} showThumbs={false}>
                <div>
                    <img src="https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_UX182_CR0,0,182,268_AL_.jpg" />
                    <p className="legend">Legend 1</p>
                </div><div>
                    <img src="https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_UX182_CR0,0,182,268_AL_.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                </Carousel>
                <Slider
                    axis="x"
                    xstep={1}
                    xmin={0}
                    xmax={100}
                    x={this.state.temperature}
                    onChange={({ x }) => this.setState({ temperature: parseInt(x) })}
                />
                <div>{this.getTemperature()}</div>
            </div>

        );
    }
}

export default Game;
