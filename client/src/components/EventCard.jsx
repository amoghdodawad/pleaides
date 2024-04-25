import React from 'react';
import './EventCard.css';
import img from './pleiadesBlack.png';

function EventCard() {
  return (
    <div className='event-card'>
        <div className='img-container'>
            <img src={img} alt="" />
        </div>
        <div className='event-details-container'>
            <div>
                Event name
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt impedit assumenda vero ipsum? Ut nam iure explicabo, repellat architecto itaque, debitis laboriosam aliquid dolore temporibus ea necessitatibus, molestias aspernatur delectus!
            </div>
            <div>
                Venue
            </div>
            <div>
                Time
            </div>
        </div>
    </div>
  )
}

export default EventCard