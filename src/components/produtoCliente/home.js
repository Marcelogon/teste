import React from 'react'
import './texte.css';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class home extends React.Component {

    render(){
        return(<div>
            <Carousel showThumbs={false} autoPlay={true} >
            <div>
                    <img src='/uploads/diversos/banner4.png' className='teste'/>
                    <p className="legend">HikVision</p>
                </div>
                <div>
                    <img src='/uploads/diversos/banner3.PNG' className='teste'/>
                    <p className="legend">Elsys</p>
                </div>
                <div>
                    <img src='/uploads/diversos/banner2.PNG' className='teste'/>
                    <p className="legend">PPA</p>
                </div>            
                </Carousel> 
        </div>)
    }

}