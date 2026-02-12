import React from 'react';

const CheckboxGroup = ({ options, value, onChange }) => {
    const handleChange = (optionId) => {
        let newValue = [...value];
        if (newValue.includes(optionId)) {
            newValue = newValue.filter(id => id !== optionId);
        } else {
            newValue.push(optionId);
        }
        onChange(newValue);
    };

    return (
        <div className="field">
            {options.map((option) => (
                <label key={option.id} className="checkbox">
                    <input
                        type="checkbox"
                        value={option.id}
                        checked={value.includes(option.id)}
                        onChange={() => handleChange(option.id)}
                    />
                    <span>{option.text}</span>
                </label>
            ))}
        </div>
    );
};

export default CheckboxGroup;
