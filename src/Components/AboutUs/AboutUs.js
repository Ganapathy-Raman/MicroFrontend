import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";

function AboutUs() {
    return (
        <>
        <section className="about-section">
            <div className="container">
                <div className="row">
                    <div className="content-column col-lg-6 col-md-12">
                        <div className="inner-column">
                            <div className="sec-title">
                                <span className="title">About Organ Donation in our Hospital</span>
                                <h2>We are Promoting Organ Donation</h2>
                            </div>
                            <p className="text">
                                The indication of organ donation is to provide a second chance of life for someone who is suffering from organ failure or a serious medical condition that has led to the malfunction or loss of a vital organ.
                            </p>
                            <p className="text">
                                <strong>Who can be a Donor?</strong> Living Donor: Any person not less than 18 years of age, who voluntarily authorizes the removal of any of his organ and/or tissue, during his or her lifetime, as per prevalent medical practices for therapeutic purposes.
                            </p>
                            <div className="btn-box">
                                <Link to="/donate" className="theme-btn btn-style-one">Donate Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="image-column col-lg-6 col-md-12">
                        <div className="inner-column">
                            <img
                                src="https://cdn-prod.medicalnewstoday.com/content/images/articles/282/282905/organ-for-transplant.jpg"
                                alt="Organ Donation"
                                className="responsive-img"
                            />
                        </div>
                    </div>
                </div>
                <div className="sec-title">
                    <span className="title">Our Future Goal</span>
                    <h2>1000 Organ Donations and Transplants in a Day</h2>
                </div>
                <p className="text">
                    <strong>Situation of Shortage of Organs in India:</strong>
                    <br />
                    There is a wide gap between patients who need transplants and the organs that are available in India.
                    <br />
                    An estimated around 1.8 lakh persons suffer from renal failure every year; however, the number of renal transplants done is around 6000 only.
                </p>
            </div>
        </section>
        </>
    );
}

export default AboutUs;
