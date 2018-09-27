import React, { Component } from 'react';

import './ContactInfoHeader.css';
import avatar from '../../../assets/images/user.svg';

class ContactInfoHeader extends Component {
    render() {
        return(
            <div className="contact-info__header">
            <div className="contact-info__header__left">
                <img src={avatar} alt="Avatar" />
            </div>
    
            <div className="contact-info__header__mid">
                <div className="contact-info__header__mid__title">
                    Sender
                </div>
    
                <div className="contact-info__header__mid__status">
                    This is a content
                </div>
            </div>
    
            <div className="contact-info__header__right">
                <div>
                    <svg viewBox="0 0 64 64" style={{ clipRule: 'evenodd', fill: 'none', fillRule: 'evenodd', stroke: 'crimson', strokeMiterlimit: 10, strokeWidth: 2 }}>
                    <title>Make a voice call</title>
                    <path d="M48.3,50.5c-7.7,6.5-24.2-10-24.5-10.3C23.5,39.9,7,23.4,13.5,15.7c4.8-5.7,6.3-3.4,7-2.7
                        c0.6,0.5,5.7,7.8,6,9.2c0.3,1.4-2.4,4.6-2.2,5.9c0.2,1.2,3.6,5,5.1,6.5c1.5,1.5,5.3,4.9,6.5,5.1c1.2,0.2,4.4-2.5,5.9-2.2
                        c1.4,0.3,8.7,5.4,9.2,6C51.6,44.2,54,45.7,48.3,50.5z"></path>
                    </svg>
                </div>
                <div>
                <svg viewBox="0 0 64 64" style={{ clipRule: 'evenodd', fill: 'none', fillRule: 'evenodd', stroke: 'crimson', strokeMiterlimit: 10, strokeWidth: 2 }}><title>Make a video call</title><g><g><path d="M47,27.8v7.5l9,4.5V23.2L47,27.8z M37.2,17H13.8C10.6,17,8,19.6,8,22.8v17.4c0,3.2,2.6,5.8,5.8,5.8h23.3
                c3.2,0,5.8-2.6,5.8-5.8V22.8C43,19.6,40.4,17,37.2,17z"></path></g></g></svg>
    
                </div>
            </div>
        </div>
        );
    }
}

export default ContactInfoHeader;