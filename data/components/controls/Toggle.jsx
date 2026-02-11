import React from 'react';

const Toggle = ({ options, value, onChange }) => {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onChange(option.id)}
                    style={{
                        padding: '10px 30px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        backgroundColor: value === option.id ? '#007bff' : 'white',
                        color: value === option.id ? 'white' : 'black',
                        transition: 'all 0.2s',
                        outline: 'none'
                    }}
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default Toggle;
