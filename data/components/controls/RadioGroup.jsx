import React from 'react';

const RadioGroup = ({ options, value, onChange }) => {
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
                        backgroundColor: value === option.id ? '#f0f8ff' : 'white'
                    }}
                >
                    <input
                        type="radio"
                        name="radio-group"
                        value={option.id}
                        checked={value === option.id}
                        onChange={() => onChange(option.id)}
                        style={{ marginRight: '10px' }}
                    />
                    {option.text}
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;
