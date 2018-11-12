import React from 'react';

import AvailableContact from './AvailableContact/AvailableContact';

import './AvailableContactList.css';

const availableContactList = ({ searchValue, contactList }) => {
    const searchList = contactList.map(contact => contact.partner ? contact.partner.fullname : contact.roomId);
    if (searchValue === '') {
        return (
            <div className="contact-list__all">
                {searchList.map((searchItem, i) => <AvailableContact key={contactList[i].roomId} username={contactList[i].partner ? contactList[i].partner.username : null} searchItem={searchItem} roomId={contactList[i].roomId} />)}
            </div>
        );
    } else { 
        return (
            <div className="contact-list__all">
                {searchList.map((searchItem, i) => searchItem.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ? <AvailableContact key={contactList[i].roomId}  username={contactList[i].partner ? contactList[i].partner.username : null} searchItem={searchItem} roomId={contactList[i].roomId} /> : null)}
            </div>
        );
    }
};

export default availableContactList;