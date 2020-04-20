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
                  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carousel" data-slide-to="0" className="active"></li>
                      <li data-target="##carousel" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2Fslider1.png?alt=media&token=555174f2-d80c-4b2e-b72c-ab7cb697f710" alt="Pandemic" />
                      </div>
                      <div className="carousel-item">
                        <img className="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2Fslider2.png?alt=media&token=746713e5-72c9-474e-bdc6-3d12632cf816" alt="Ugears" />
                      </div>
                    </div>
                    <a className="carousel-control-prev-izq" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fas fa-chevron-circle-left"></i></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next-der" href="#carouselExampleIndicators" role="button" data-slide="next">
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
                      <a href="/">
                        <img className="img-fluid"
                          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2Fgrid1.png?alt=media&token=284c98da-0f09-4756-b5eb-bb73d6bc39d5"
                          alt="info-Grid" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 pt-2">
                <div className="card border-0 rounded-0 text-white overflow zoom">
                  <div className="position-relative">
                    <div className="ratio_right-cover-2 image-wrapper">
                      <a href="/">
                        <img className="img-fluid"
                          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Slider%2Fgrid2.png?alt=media&token=f78c89ed-1ec5-405e-bf71-eef8f3ad593f"
                          alt="info-Grid" />
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
