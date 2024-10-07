/* eslint-disable react/prop-types */
import React from 'react';

const AvatarPreview = ({ image }) => {
    if(!image || image.length === 0) {
        return null
    }

    const imageUrl = URL.createObjectURL(image[0])

    return (
        <div className="mt-2">
            <img src={imageUrl} alt="Avatar Preview" className="w-14 h-14 rounded-full object-cover" />
        </div>
    );
};

export default AvatarPreview;
