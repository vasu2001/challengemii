import React from "react";
import Slide from "react-reveal/Slide";
import { Route, Switch } from "react-router-dom";
import "./vote.css";

import Nav from '../../components/Nav-new/Nav';
import Banner from '../../components/Compi-banner/banner';
// import Voter from '../../components/Voters/Voter';

import money from "../../assets/money.png";
import skills from "../../assets/skills.png";
import trophy from "../../assets/trophy.png";
import population from "../../assets/population.png";
import calendar from "../../assets/calendar.png";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import Submissions from "../../components/Submissions/Submissions";
// import { BsClockFill } from "react-icons/bs";

const vote = () => {
  return (
    <div>
      <Banner />
      <div className="body-container">
        <div
          className="timeStamp"
          style={{
            textAlign: "right",
            marginBottom: "10px",
            marginRight: "40px",
          }}
        >
          <p>16 Apr, 2021 12:00 AM IST - 26 Apr,2021 06:00 AM IST</p>
        </div>
        <div className="info-container">
          <div className="compi-dp"></div>
          <div className="side-1">
            <div className="upper">
              <p style={{ fontSize: "28px", marginBottom: "5px" }}>
                Hack the space
              </p>
              <p style={{ marginLeft: "3px" }}>lorem ipsum dolor sit amet.</p>
            </div>
            <div className="date-time">
              <p style={{ fontSize: "16px", marginLeft: "20px" }}>
                Start:
                <span
                  style={{
                    fontSize: "14px",
                    marginLeft: "10px",
                    color: "#454545",
                  }}
                >
                  16 Apr, 2021 12:00 AM IST
                </span>
              </p>
              <p
                style={{
                  fontSize: "16px",
                  marginLeft: "20px",
                  marginBottom: "15px",
                }}
              >
                End:
                <span
                  style={{
                    fontSize: "14px",
                    marginLeft: "10px",
                    color: "#454545",
                  }}
                >
                  26 Apr, 2021 6:00 AM IST
                </span>
              </p>
            </div>
            <div className="lower">
              <div className="lower-item">
                <img className="prizeImg" alt="Prize" src={trophy} />
                <p style={{ marginTop: "3px", marginLeft: "10px" }}>
                  Prize: <span>Rs.2000</span>
                </p>
              </div>
              <div className="lower-item">
                <img className="prizeImg" alt="Prize" src={skills} />
                <p style={{ marginTop: "3px", marginLeft: "10px" }}>
                  Eligible: <span>All</span>
                </p>
              </div>
              <div className="lower-item">
                <img className="prizeImg" alt="Prize" src={money} />
                <p style={{ marginTop: "3px", marginLeft: "10px" }}>
                  Entry: <span>Rs. 500</span>
                </p>
              </div>
            </div>
          </div>
          <div></div>
          <div className="side-2">
            <a href={()=>false}className="btn btn-slide">Participate</a>
            <div className="slide2-content">
              <div className="slide2-item">
                <img className="slideImg" alt="Prize" src={population} />
                <p style={{ fontSize: "28px" }}>48</p>
                <p style={{ color: "#484848" }}>Registered</p>
              </div>
              <div className="slide2-item">
                <img className="slideImg" alt="Prize" src={calendar} />
                <p style={{ fontSize: "28px" }}>4</p>
                <p style={{ color: "#484848" }}>Days Left</p>
              </div>
              <div className="entry">Rs. 500</div>
            </div>
          </div>
        </div>
        <hr style={{ margin: "150px -100px", width: "100" }} />
        <div className="about-container">
          <div className="about-heading">
            <p>
              All that you need to know about <span>Hack the Space</span>
            </p>
            <div className="about-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus pellentesque eros est, vel accumsan ipsum finibus
                vestibulum. Aliquam ipsum dolor, consectetur sed libero quis,
                varius volutpat risus. Maecenas varius porta vehicula. Aenean
                eleifend diam sed faucibus luctus. Fusce rhoncus facilisis
                nulla, sit amet ullamcorper ipsum rhoncus vel. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Suspendisse imperdiet nunc sed ante pellentesque, vel
                elementum nibh gravida. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Nullam fringilla
                elit nec tortor ultricies, id facilisis lacus mattis. Duis
                feugiat ac elit at euismod. Maecenas condimentum suscipit diam
                vel imperdiet.
              </p>
              <p>
                Cras id dolor erat. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nulla facilisi. Donec
                eget turpis venenatis, rutrum mi in, mattis purus. Praesent
                consectetur tincidunt suscipit. Nunc placerat posuere nisl et
                rutrum. Sed accumsan luctus odio, id faucibus ex suscipit eget.
                Cras libero erat, fermentum eget hendrerit et, aliquam convallis
                lorem.
              </p>
            </div>
          </div>
        </div>
        <hr style={{ margin: "150px -100px", width: "100" }} />
        <div className="submission-container">
          <Switch>
            <Route path="/competition/participant" component={Leaderboard} />
          </Switch>
          <p style={{ fontSize: "28px" }}>SUBMISSIONS</p>
          <div className="card-container">
            <Submissions />
            <Submissions />
            <Submissions />
            <Submissions />
            <Submissions />
            <Submissions />
            <Submissions />
            <Submissions />
            <Submissions />
          </div>
        </div>
      </div>
      <Slide right>
        <a href={()=>false} className="btn vote-btn">Vote</a>
      </Slide>
    </div>
  );
};

export default vote;
