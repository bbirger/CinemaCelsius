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
        return mA===mB ? 1 : 0;

    return dotProduct / (mA * mB);
}
class Result extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.movies);
        console.log(props.temperatures);
        const celsiuses = [reviews.matilda, reviews.sebastian, reviews.johan];
        this.names = ['Matilda','Sebastian', 'Johan']
        this.images = [matilda, sebastian, johan]
        const pod_reviews = celsiuses.map(r => props.movies.map(x => r[x]));
        const similarities = pod_reviews.map(x => similarity(props.temperatures, x));
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
