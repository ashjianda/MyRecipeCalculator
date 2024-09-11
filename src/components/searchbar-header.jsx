import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    return (
        <div className="search-bar-header">
            <input onKeyDown={(e) => e.key === 'Enter' && navigate(`/result?query=${search}`)} placeholder='Search for recipes' value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <FaSearch color="white" size="2em" className="search-icon-header" onClick={() => navigate(`/result?query=${search}`)} />
        </div>
    );
};

export default Searchbar;