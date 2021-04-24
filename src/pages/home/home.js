import React from 'react'
import './home.css';
// import Nav from '../../components/Nav/Nav'
import Card from '../../components/Cards/cards';
import Banner from '../../components/Home-banner/Banner';
import Info from '../../components/Info-Card/Card';
import image1 from '../../assets/explore.png'
import Footer from '../../components/Footer/Footer'

const home = () => {
    return (
        <div className='homepage'>
            <Banner />
            <section className='section-about'>
                <div className='about-text-container'>
                    <div className='about-text'>
                        <h1 className='about-title'>Lorem Impsum dolor</h1>
                        <div className='textbox'>
                            <p className='about-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque eros est, vel accumsan ipsum finibus vestibulum.Nam hendrerit molestie nisl, quis facilisis ex consectetur sed.</p>
                            <p className='about-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque eros est, vel accumsan ipsum finibus vestibulum.</p>
                            <p className='about-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eros est, vel accumsan ipsum finibus vestibulum.Maecenas pretium dolor ut ex mattis ultricies. Phasellus vel faucibus enim.</p>
                        </div>
                    </div>
                </div>
                <div className='about-img-container'>
                    <img src={image1} alt='explore' className='about-img'/>
                </div>
            </section>
            <section className='section-info'>
                <Info title="Participate" />
                <Info title="Vote"/>
                <Info title="Affiliate Program"/>
                <Info title="Refer to friends"/>
            </section>
            <section className='section-compi'>
            <div style={{width:'100%', textAlign:'center',marginTop:'10px', marginBottom:'70px'}}>
                <h1 className='heading-primary'>Competitions</h1>
            </div>
                <div className='compi-nav'>
                    <div className='ongoing'>
                        <h1 className='heading-secondary'>Ongoing</h1>
                    </div>
                    <div className='upcoming'>
                        <h1 className='heading-secondary'>Upcoming</h1>
                    </div>
                </div>
                <div className='competition-container' id='competitions'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default home
