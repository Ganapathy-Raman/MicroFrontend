import React from "react";
import './Carousel.css';
import { Link } from "react-router-dom";

function Carousel() {
    return (
        <>
            <div className="container-fluid">
                <div id="carouselExampleCaptions" className="carousel slide w-100" data-bs-ride="carousel" >
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                    <div className="carousel-item active">
                            <img src="https://www.nebraskamed.com/sites/default/files/images/Organ-donation/10Reasons_OpenGraph.png" />

                            <div className="carousel-caption d-none d-md-block">
                                <h5>Save Lives</h5>
                                <p>During lifetime, a person can pledge for organ donation by filling up a donor form in the presence of two witnesses, one of whom shall be a near relative.</p>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <img src="https://images.news18.com/ibnlive/uploads/2021/08/organ-16288242144x3.jpg?impolicy=website&width=640&height=480" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Organ Donation</h5>
                                <p>Organ donation and transplantation is a surgical process to replace a failing organ with a healthy one from someone else who doesn't need it.</p>
                            </div>
                        </div>
                       
                        <div className="carousel-item">
                            <img src="https://images.news18.com/ibnlive/uploads/2023/05/wp-image-256-16832935813x2.jpg?impolicy=website&width=640&height=480" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Most Donated Organ</h5>
                                <p>Kidneys are the organs most frequently needed, followed by livers. Both of these organs can be donated by living donors to save someone's life. </p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <br />
        </>
    )
}
export default Carousel;