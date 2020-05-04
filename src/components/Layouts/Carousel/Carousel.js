import React from "react";
import './Carousel.scss';

const CarouselContainer = () => {

  return (
    <div>
      <div className="container-fluid-carousel">
        <div className="row">
          <div className="col-12 col-md-8 col-sm-12 col-xs-12">
            <div className="card border-0 rounded-0 text-light overflow zoom">
              <div className="position-relative">
                <div className="ratio_left-cover-1 image-wrapper">
                  <div id="carousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carousel" data-slide-to="0" className="active"></li>
                      <li data-target="#carousel" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FSliders%2F1%2Fslider1?alt=media&token=5bb00267-e77f-4ea7-b154-838b84d63aa9" alt="slide1" />
                      </div>
                      <div className="carousel-item">
                        <img className="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2FSliders%2F2%2Fslider2?alt=media&token=032b65ce-5dfe-4f96-a9cc-6d602451dae1" alt="slide2" />
                      </div>
                    </div>
                    <a className="carousel-control-prev-izq" href="#carousel" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fas fa-chevron-circle-left"></i></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next-der" href="#carousel" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"><i className="fas fa-chevron-circle-right"></i></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
