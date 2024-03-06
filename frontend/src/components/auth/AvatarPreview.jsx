/* eslint-disable react/prop-types */
import React from 'react';

const AvatarPreview = ({ image }) => {
    return (
        <div className="mt-2">
            <img src={image} alt="Avatar Preview" className="w-14 h-14 rounded-full object-cover" />
        </div>
    );
};

export default AvatarPreview;
