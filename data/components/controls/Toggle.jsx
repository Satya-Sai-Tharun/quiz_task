import React from 'react';

const Toggle = ({ options, value, onChange }) => {
    return (
        <nav className="no-space">
             {options.map((option) => (
                <button 
                    key={option.id}
                    className={value === option.id ? 'fill' : 'border'}
                    onClick={() => onChange(option.id)}
                >
                    {option.text}
                </button>
            ))}
        </nav>
    );
};

export default Toggle;
