import React, { Component, useState } from 'react';
import './hostCompetition.css';
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { v4 as uuid4 } from 'uuid';

const db = firebase.firestore();

const initState = {
   title: '',
   tagline: '',
   starts: '',
   ends: '',
   prize: '',
   fees: '',
   desc: '',
   coverUrl: '',
   photoUrl: '',
   preregis: '',
   loading: false,
   voterPrize: '',
   refer: '',
   votes: 3,
};

class HostCompetiton extends Component {
   state = initState;

   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value,
      });
   };
   handleUpload = (e) => {
      this.setState({
         [e.target.id]: e.target.files[0],
      });
   };

   handleSubmit = async (e) => {
      e.preventDefault();
      this.setState({ loading: true });

      try {
         const coverRef = firebase.storage().ref(`compi-covers/${uuid4()}`);
         const photoRef = firebase.storage().ref(`compi-covers/${uuid4()}`);

         await coverRef.put(this.state.coverUrl);
         await photoRef.put(this.state.photoUrl);

         const coverUrl = await coverRef.getDownloadURL();
         const photoUrl = await photoRef.getDownloadURL();

         await db.collection('competitions').add({
            title: this.state.title,
            tagline: this.state.tagline,
            starts: this.state.starts,
            ends: this.state.ends,
            prize: this.state.prize.split(',').map((x) => parseInt(x.trim())),
            fees: this.state.fees,
            preregis: this.state.preregis,
            desc: this.state.desc,
            voterPrize: this.state.voterPrize,
            refer: this.state.refer,
            votes: this.state.votes,
            coverUrl,
            photoUrl,
            submissions: 0,
         });

         toast.success('Competition added successfully');
         this.setState({ ...initState });
      } catch (err) {
         console.log(err);
         toast.error('Error adding document');
         this.setState({ loading: false });
      }
   };
   render() {
      return (
         <div>
            {this.state.loading ? <Loading /> : null}
            <div className="host-competition">
               <p>Competition Title:</p>
               <input
                  type="text"
                  onChange={this.handleChange}
                  id="title"
                  className="input-field host-field"
                  placeholder="Title"
               ></input>

               <p>Competition Tagline:</p>
               <input
                  type="text"
                  onChange={this.handleChange}
                  id="tagline"
                  className="input-field host-field"
                  placeholder="Tagline"
               ></input>

               <p>Starts at:</p>
               <input
                  type="date"
                  onChange={this.handleChange}
                  id="starts"
                  className="input-field host-field"
               ></input>

               <p>End at:</p>
               <input
                  type="date"
                  onChange={this.handleChange}
                  id="ends"
                  className="input-field host-field"
               ></input>

               <p>Winning prize (comma seperated nos) :</p>
               <input
                  onChange={this.handleChange}
                  id="prize"
                  className="input-field host-field"
                  placeholder=""
               ></input>

               <p>Entry fees:</p>
               <input
                  type="number"
                  onChange={this.handleChange}
                  id="fees"
                  className="input-field host-field"
                  placeholder=""
               ></input>

               <p>Pre-registration Entry fees:</p>
               <input
                  type="number"
                  onChange={this.handleChange}
                  id="preregis"
                  className="input-field host-field"
                  placeholder=""
               ></input>

               <p>Voter's Prize:</p>
               <input
                  type="number"
                  onChange={this.handleChange}
                  id="voterPrize"
                  className="input-field host-field"
                  placeholder=""
               ></input>

               <p>Refer Prize:</p>
               <input
                  type="number"
                  onChange={this.handleChange}
                  id="refer"
                  className="input-field host-field"
                  placeholder=""
               ></input>

               <p>Votes:</p>
               <input
                  type="number"
                  onChange={this.handleChange}
                  id="votes"
                  className="input-field host-field"
                  placeholder=""
               ></input>

               <p>Description:</p>
               <textarea
                  type="text"
                  onChange={this.handleChange}
                  id="desc"
                  className="input-field host-field ques-input"
                  placeholder="Description"
               ></textarea>

               <p>Upload competition cover</p>
               <input
                  id="coverUrl"
                  onChange={this.handleUpload}
                  type="file"
               ></input>

               <p>Upload competition photo</p>
               <input
                  id="photoUrl"
                  onChange={this.handleUpload}
                  type="file"
               ></input>
            </div>
            <div className="save">
               <a
                  onClick={(e) => {
                     if (this.state.title !== '') {
                        this.setState({ loading: true });
                        this.handleSubmit(e);
                     } else {
                        toast.error('Fill up all fields');
                     }
                  }}
                  className="btn-save"
               >
                  Save
               </a>
            </div>
         </div>
      );
   }
}

export default HostCompetiton;
