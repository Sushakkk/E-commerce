import React from 'react';

import '../../styles/variables.scss';

interface PaginationIconProps {
    direction?: 'left' | 'right'; 
    color?: 'primary' | 'secondary' | 'base';
    strokeWidth?: string;
}

const PaginationIcon: React.FC<PaginationIconProps> = ({ direction = 'left', color = 'primary', strokeWidth = '1.5' }) => {
    const rotation = direction === 'right' ? 180 : 0; 


    const cursor = color === 'primary' || color === 'base' ? 'pointer' : 'not-allowed';

 
    const colors = {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        base: 'var(--base)'
    };

    return (
        <svg
            width="38"
            height="42"
            viewBox="0 0 38 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)`, cursor }} 
        >
            <path
                d="M23.12 31.5599L14.4267 22.8666C13.4 21.8399 13.4 20.1599 14.4267 19.1333L23.12 10.4399"
                stroke={colors[color]} 
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PaginationIcon;
