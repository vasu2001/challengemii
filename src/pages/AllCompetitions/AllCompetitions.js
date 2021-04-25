import React from 'react'
import Nav from '../../components/Nav-new/Nav'
import './allCompetitions.css';
import Card from '../../components/Cards/cards';
import Footer from '../../components/Footer/Footer';
const AllCompetitions = () => {
    return (
        <div>
            <Nav />
            <div className='all-competitions-content'>
                <div className='compi-nav'>
                        <div className='ongoing'>
                            <h1 className='heading-secondary'>Ongoing</h1>
                        </div>
                        <div className='upcoming'>
                            <h1 className='heading-secondary'>Upcoming</h1>
                        </div>
                    </div>
                    <h2 style={{marginTop:'90px'}} >COMPETITIONS</h2>
                    <div className='competition-container' id='competitions'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllCompetitions
