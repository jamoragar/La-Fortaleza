import React from 'react';

const Slider = (props) => {
    const {fbSlider} = props;
    console.log(fbSlider);
    return(
        <div>
            {Object.entries(fbSlider).map(([title, content], i) => {
                return(
                    <div key={i}>
                        <h1>{title}</h1>
                        {content.map((img, j) => {
                            return(
                                <div key={j}>
                                    <img src={img} alt={`Imagen: ${j}`} width='100' />
                                    <br/>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Slider;