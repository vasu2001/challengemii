import React, { Component } from 'react'
import Nav from '../../components/Nav-new/Nav'
import './allCompetitions.css';
import Footer from '../../components/Footer/Footer';
import CarouselNew from '../../components/Carousel-New/CarouselNew';
import CardNew from '../../components/Cards-new/CardNew';

import ongoing from '../../assets/gift-box.png'
import upcoming from '../../assets/check-in.png'
import { connect } from 'react-redux'

class AllCompetitions extends Component {
    render(){
    const { competitions } = this.props;
    return (
        <div className='all-competitions'>
            <Nav />
            <CarouselNew />
            <div className='all-competitions-content'>
                <div className='left-pane'>
                    <ul className='left-items'>
                        <li><img alt='' src={ongoing} style={{width:'30px', transform: 'translateY(-5px)', marginRight:'5px'}}/>Ongoing</li>
                        <li><img alt='' src={upcoming} style={{width:'30px', transform: 'translateY(-5px)', marginRight:'5px'}}/>Upcoming</li>
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
                    {competitions && competitions.map(competition => {
                        return(
                            <CardNew competition={competition} key={competition.id} />
                        )
                    })}
                    {/* <CardNew competitions={this.props} active={true} status='Ongoing'/> */}
                    {/* <CardNew title='TechEden' active={true} status='Ongoing'/>
                    <CardNew title='FrostHack 2021' status='Upcoming'/>
                    <CardNew title='Celo India Fellowship' status='Upcoming'/> */}
                </div>
            </div>
            <Footer />
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        competitions: state.competition.competitions
    }
} 

export default connect(mapStateToProps)(AllCompetitions)
