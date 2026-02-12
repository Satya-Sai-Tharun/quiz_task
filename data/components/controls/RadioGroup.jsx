import React from 'react';

const RadioGroup = ({ options, value, onChange }) => {
    return (
        <div className="field">
            {options.map((option) => (
                <label key={option.id} className="radio">
                    <input
                        type="radio"
                        name="radio-group"
                        value={option.id}
                        checked={value === option.id}
                        onChange={() => onChange(option.id)}
                    />
                    <span>{option.text}</span>
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;
