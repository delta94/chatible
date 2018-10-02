import React from 'react';

import Dropdown from '../../../hocs/ContactInfoDropdown/ContactInfoDropdown';
import Spinner from '../../UIs/Spinner/Spinner';

import './SharedImageList.css';

const SharedImageList = ({ images, isFetchingMoreImages }) => (
    <Dropdown title="Shared images">
        <div className="contact-info__main__images">
            {images.map(image => (
                <div key={image._id}>
                    <img src={"/uploads/" + image.hashedName} alt="Upload" />
                </div>
            ))}
        </div>
        {isFetchingMoreImages && <div className="fetching-more"><Spinner /></div>}
    </Dropdown>
);


export default SharedImageList;