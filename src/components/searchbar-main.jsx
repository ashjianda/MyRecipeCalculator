import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';
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
            <Select className="col-3 search-dropdown" defaultMenuIsOpen isMulti options={[{ value: 'Profile', label: 'Profile' }, { value: 'Shopping List', label: 'Shopping List' }, { value: 'My Pantry', label: 'My Pantry' }, { value: 'My Recipes', label: 'My Recipes' }, { value: 'Settings', label: 'Settings' }]} />
        </div>
    );
};

export default Searchbar;