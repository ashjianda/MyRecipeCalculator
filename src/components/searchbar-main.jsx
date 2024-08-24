import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    return (
        <div className="search-container">
            <div className="col-auto search-bar">
                <input placeholder='Search for recipes' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <FaSearch color="#764caa" size="2em" className="search-icon-main" onClick={() => navigate(`/result?query=${search}`)} />
            </div>
            <span className="col-auto"> or </span>
            <Link className="btn ing-btn col-auto" to="/">Search By Ingredient</Link>
        </div>
    );
};

export default Searchbar;