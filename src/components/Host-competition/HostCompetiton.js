import React, {Component} from 'react'
import './hostCompetition.css'
import {connect} from 'react-redux';
import { createCompetition } from '../../store/actions/competitionActions'

class HostCompetiton extends Component {

    state = {
        title: '',
        tagline: '',
        starts: '',
        ends: '',
        prize: '',
        fees: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createCompetition(this.state)
    }
    render() {
    return (
        <div>
            <div className='host-competition'>
                <p>Competition Title:</p>
                <input type='text' onChange={this.handleChange} id='title' className='input-field host-field' placeholder='Title'></input>
                <p>Competition Tagline:</p>
                <input type='text' onChange={this.handleChange} id='tagline' className='input-field host-field' placeholder='Tagline'></input>
                <p>Starts at:</p>
                <input type='datetime-local' onChange={this.handleChange} id='starts' className='input-field host-field'></input>
                <p>End at:</p>
                <input type='datetime-local' onChange={this.handleChange} id='ends' className='input-field host-field'></input>
                <p>Winning prize:</p>
                <input type='number' onChange={this.handleChange} id='prize' className='input-field host-field' placeholder=''></input>
                <p>Entry fees:</p>
                <input type='number' onChange={this.handleChange} id='fees' className='input-field host-field' placeholder=''></input>
            </div>
            <div className='save'>
                    <a href={()=>false} onClick={this.handleSubmit} className='btn-save'>Save</a>
            </div>
        </div>
    )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createCompetition: (competition) => dispatch(createCompetition(competition))
    }
}

export default connect(null,mapDispatchToProps)(HostCompetiton)
