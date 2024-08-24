import React from "react";
import Nav from "../Nav/Nav.js";
import Footer from "../Footer/Footer.js";
import Carousel from "../Carousel/Carousel.js";
import AboutUs from "../AboutUs/AboutUs.js";
import ContactUs from "../ContactUs/ContactUs.js";
import Stats from "../Stats/Stats.js";
function Home() {
    return (
        <>
           <Nav />
           <br />
                <div>
                <Carousel />
                <Stats />
                <AboutUs />
                <ContactUs />
                <Footer />

                    
                </div>
            
        </>
    );
};
export default Home;