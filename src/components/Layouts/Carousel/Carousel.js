import React, { useState } from "react";
import './Carousel.scss';
import { Carousel } from 'react-bootstrap';

const CarouselContainer = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <div className="container-carousel mt-5">
        <div className="row">
          <div className="col-12 col-md-8 col-sm-12 col-xs-12">
            <Carousel>
              <Carousel.Item>
                <img
                  className="img-fluid d-block w-100"
                  src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FSliders%2F1%2Fslider1?alt=media&token=5bb00267-e77f-4ea7-b154-838b84d63aa9" alt="slide1"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-fluid d-block w-100"
                  src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FSliders%2F2%2Fslider2?alt=media&token=032b65ce-5dfe-4f96-a9cc-6d602451dae1"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-12 col-md-4 ">
            <div className="row">
              <div className="col-12 pt-2">
                <div className="card border-0 rounded-0 text-white overflow zoom">
                  <div className="position-relative">
                    <div className="ratio_right-cover-2 image-wrapper">
                      <a href="/Preventa">
                        <img className="img-fluid"
                          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FButtons%2F1%2FButton1?alt=media&token=4e3aab92-1923-450e-95d6-344cf922fb47"
                          alt="Button1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pt-2">
                <div className="card border-0 rounded-0 text-white overflow zoom">
                  <div className="position-relative">
                    <div className="ratio_right-cover-2 image-wrapper">
                      <a href="https://www.instagram.com/p/B-k5sdCFSuB/?utm_source=ig_web_copy_link" target="blank">
                        <img className="img-fluid"
                          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FButtons%2F2%2FButton2?alt=media&token=95c5dd19-16bb-4939-bcc6-508e977b00c6"
                          alt="Button2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselContainer;
