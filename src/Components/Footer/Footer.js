import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <section id="footer">
        <div class="main-footer">
          <div class="logoinfo" data-aos="fade-up">
            <h2>ABC Hospital Dean</h2>
            <p>Dr. Nikhil, MBBS, FRCS, MD</p>
            <br />
            <h2>ABC Hospital CEO</h2>
            <p>Dr. Shilpa, MBBS, MD</p>

            <div class="contact-details">
              <ul>
                <li>
                  <div class="fa fa-phone"></div>
                  <a href="tel:+919326048690">+91 0987654321</a>
                </li>
                <li>
                  <div class="fa fa-envelope"></div>
                  <a href="mailto:abchospitalteam@gmail.com">abchospitalteam@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="com" data-aos="fade-up">
            <h1>Available Organs</h1>
            <ul>
              <li><a href="#">Kidney</a></li>
              <li><a href="#">Liver</a></li>
              <li><a href="#">Lungs</a></li>
              <li><a href="#">Eye</a></li>
            </ul>
          </div>
          <div class="info" data-aos="fade-up">
            <h1>Social Media</h1>
            <div class="sociallogos">
              <div class="logobox">
                <a href="#" class="fa fa-instagram"></a>
                <a href="#" class="fa fa-linkedin"></a>
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-youtube-play"></a>
              </div>
            </div>
          </div>
        </div>
        <footer>© ABC Hospital Copyright 2024 All Rights Reserved</footer>
      </section>


    </>
  )
}
export default Footer;