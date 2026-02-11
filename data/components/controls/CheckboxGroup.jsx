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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {options.map((option) => (
                <label 
                    key={option.id} 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        padding: '10px',
                        border: '1px solid #eee',
                        borderRadius: '4px',
                        backgroundColor: value.includes(option.id) ? '#f0f8ff' : 'white'
                    }}
                >
                    <input
                        type="checkbox"
                        value={option.id}
                        checked={value.includes(option.id)}
                        onChange={() => handleChange(option.id)}
                        style={{ marginRight: '10px' }}
                    />
                    {option.text}
                </label>
            ))}
        </div>
    );
};

export default CheckboxGroup;
