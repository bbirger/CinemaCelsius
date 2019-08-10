import React from 'react';
import reviews from './resources/reviews.json';
import './App.css';

import matilda from './resources/matilda.jpg';
import sebastian from './resources/sebastian.jpg';
import johan from './resources/johan.jpg';

function similarity(A, B) {
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;
    for (let i = 0; i < A.length; i++) {
        dotProduct += (A[i] * B[i]);
        mA += (A[i] * A[i]);
        mB += (B[i] * B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    if(mA === 0 || mB === 0)
        return 0;

    const cosSim = dotProduct / (mA * mB);
    if(Number.isNaN(cosSim))
        return 0
    else
        return cosSim
}
class Result extends React.Component {
    constructor(props) {
        super(props);

        const celsiuses = [reviews.matilda, reviews.sebastian, reviews.johan];
        this.names = ['Matilda','Sebastian', 'Johan']
        this.images = [matilda, sebastian, johan]

        const movies = Object.keys(props.temperatures);
        const temperatures = movies.map(movie => props.temperatures[movie]);

        const pod_reviews = celsiuses.map(r => movies.map(x => r[x]));
        const similarities = pod_reviews.map(x => similarity(temperatures, x));
        this.most_similair = similarities.indexOf(Math.max(...similarities))
    }    

    render() {
        return (
            <div>
            <img alt='portrait' className="portrait" src={this.images[this.most_similair]}></img>
            <p>Woho du blev en {this.names[this.most_similair]}<span role="img" aria-label="Popcorn">🍿</span></p>
            </div>
        );
    }
}


export default Result;
