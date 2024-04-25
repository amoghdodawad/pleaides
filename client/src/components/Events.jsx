import React, { useState } from 'react';
import './Events.css';
import EventCard from './EventCard';

function Events() {
    const items = Array(5).fill(1);
    const [ active, setActive ] = useState('event');
    return (
        <div className='event-page-container'>
            <video 
                id="background-video"
                src={`https://home.amoghasdodawad.dev/api/video/${active}`} 
                type="video/mp4"
                loop
                autoPlay
                muted
                poster="https://assets.codepen.io/6093409/river.jpg"
            >
            </video>
            <div className='event-navbar'>
                <div onClick={() => setActive('event')}>
                    Celeb
                </div>
                <div onClick={() => setActive('keynote')}>
                    Keynote
                </div>
            </div>
            <div className="events-container">
                {items.map((item) => {
                    console.log(item);
                    return <div> <EventCard item={item}/> </div>
                })}
            </div>
        </div>
    );
}

export default Events