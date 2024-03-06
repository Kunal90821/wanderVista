/* eslint-disable react/prop-types */
import React from 'react';

const calculateStrength = (password) => {
    const minLength = password.length >= 8;
    const hasLowerCase = /[a-z]+/.test(password);
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasNumbers = /[0-9]+/.test(password);
    const hasSpecialChars = /[$-/:-?{-~!"^_`[\]]/g.test(password); // Any special character

    return (minLength ? 1 : 0) + (hasLowerCase ? 1 : 0) + (hasUpperCase ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSpecialChars ? 1 : 0);
};

const PasswordStrengthIndicator = ({ password }) => {
    const strength = calculateStrength(password);

    let strengthLabel;
    let strengthColor;
    let progressColor;
    const progressWidth = (strength / 4) * 100; // Adjusted progress bar width calculation

    if (password.length === 0) {
        strengthLabel = '';
        strengthColor = 'text-gray-700';
        progressColor = 'bg-gray-300';
    } else if (strength < 2) {
        strengthLabel = 'Weak';
        strengthColor = 'text-red-500';
        progressColor = 'bg-red-500';
    } else if (strength < 4) {
        strengthLabel = 'Fair';
        strengthColor = 'text-yellow-500';
        progressColor = 'bg-yellow-500';
    } else {
        strengthLabel = 'Good';
        strengthColor = 'text-green-500';
        progressColor = 'bg-green-500';
    }

    return (
        <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password Strength</label>
            <div className="relative">
                <div className="w-full h-2 rounded-md bg-gray-300 mt-1">
                    <div
                        className={`h-full rounded-md ${progressColor}`}
                        style={{ width: `${progressWidth}%` }} // Set width dynamically
                    />
                </div>
                <span className={`absolute top-0 right-0 -mt-6 text-sm ${strengthColor}`}>{strengthLabel}</span>
            </div>
        </div>
    );
};

export default PasswordStrengthIndicator;
