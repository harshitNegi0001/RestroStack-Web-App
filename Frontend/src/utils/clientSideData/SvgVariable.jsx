export const VegIcon = ({ size = 20, className = '' }) => (
    <svg
        width={size} height={size} className={className}
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="1.5" y="1.5" width="17" height="17" rx="1.5" stroke="#008000" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4" fill="#008000" />
    </svg>
);

export const NonVegIcon = ({ size = 20, className = '' }) => (
    <svg
        width={size} height={size} className={className}
        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="1.5" y="1.5" width="17" height="17" rx="1.5" stroke="#8B4513" strokeWidth="1.5" />
        <path d="M10 5L15 14H5L10 5Z" fill="#8B4513" />
    </svg>
);