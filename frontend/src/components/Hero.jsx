import React from "react";
import { Row, Col, Button } from "antd";
import "./Hero.css";
import longArrow from "../assets/images/hero/long-arrow.svg";
import stylishArrow from "../assets/images/hero/style-arrow.svg";
import profilePic from "../assets/images/hero/hero.png"; // Verify correct path
import star from "../assets/images/hero/star.svg";

const Hero = () => {
  return (
    <section className="hero-area" id="home">
      <div className="hero-content">
        <Row align="middle" justify="space-between">
          {/* Text Content */}
          <Col xs={24} md={12} className="hero-text">
            <div className="content-wrapper">
              <h4 className="gradient-subtitle">Chronic Kidney Disease Prediction</h4>
              
              {/* ... (rest of social links section remains same) ... */}

              <h1 className="animated-heading">
                <span className="highlight">Revolutionizing Health</span> 
                <br />
                <span className="gradient-text"> Ai Precision </span>
              </h1>

              {/* ... (rest of CTA buttons remains same) ... */}
            </div>
          </Col>

          {/* Profile Image */}
          <Col xs={24} md={12} className="hero-visual">
            <div className="profile-container">
              <div className="decorative-element pulse-animation">
                <img src={star} alt="decorative star" />
              </div>
              <div className="image-wrapper hover-effect">
                <img 
                  src={profilePic} 
                  alt="Arul Prakash" 
                  className="profile-image " 
                />
              </div>
              <div className="animated-border"></div>
              <img 
                src={stylishArrow} 
                alt="decorative arrow" 
                className="floating-arrow" 
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;