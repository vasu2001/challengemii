import React from 'react'
import Nav from '../../components/Nav-new/Nav'
import './allCompetitions.css';
import Footer from '../../components/Footer/Footer';
import CarouselNew from '../../components/Carousel-New/CarouselNew';
import CardNew from '../../components/Cards-new/CardNew';

import ongoing from '../../assets/gift-box.png'
import upcoming from '../../assets/check-in.png'

const AllCompetitions = () => {
    return (
        <div className='all-competitions'>
            <Nav />
            <CarouselNew />
            <div className='all-competitions-content'>
                <div className='left-pane'>
                    <ul className='left-items'>
                        <li><img src={ongoing} style={{width:'30px', transform: 'translateY(-5px)', marginRight:'5px'}}/>Ongoing</li>
                        <li><img src={upcoming} style={{width:'30px', transform: 'translateY(-5px)', marginRight:'5px'}}/>Upcoming</li>
                    </ul>
                </div>
                <div className = 'right-pane'>
                    <div className = 'right-header'>
                        <h2>Competitions</h2>
                        <div className='status'>
                            <div className='ongoing'>Ongoing</div>
                            <div className='upcoming'>Upcoming</div>
                        </div>
                    </div>
                    <CardNew title='Hack the space' active={true} status='Ongoing'/>
                    <CardNew title='TechEden' active={true} status='Ongoing'/>
                    <CardNew title='FrostHack 2021' status='Upcoming'/>
                    <CardNew title='Celo India Fellowship' status='Upcoming'/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllCompetitions
