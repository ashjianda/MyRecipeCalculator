import React from 'react';

const Icon = ({ src, alt, text, to }) => {
    return (
        <div className="icon col-4 text-center p-0">
            <a href={to}>
                <img style={{ width: "50%", height: "auto" }} src={src} alt={alt} />
                <p className="m-0" style={{ fontWeight: "bold" }}>{text}</p>
            </a>
        </div>
    );
};

export default Icon;