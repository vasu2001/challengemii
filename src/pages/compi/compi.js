import React from 'react'
import Hero from '../../container/Hero/hero';
import Card from '../../components/Cards/cards';
import Nav from '../../components/Nav/Nav'
import './compi.css';

const App = () => {
    return (
        <div>
        <div style={{marginBottom:"150px"}}>
            <Nav />
        </div>
            <Hero />
            <div className="category">
                <a href="ds" className="btn around">Ongoing</a>
                <a href="ds" className="btn around">Upcoming</a>
            </div>
            <div className="cards">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default App
