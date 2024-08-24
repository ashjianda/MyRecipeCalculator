import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Recipe from '../components/recipe';

const Result = ({ authorized }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const diet = queryParams.get('diet');
    const intolerances = queryParams.get('intolerances');
    const type = queryParams.get('type');
    const cuisine = queryParams.get('cuisine');
    const searchInput = queryParams.get('query');
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchMore = () => {
        setOffset(offset + 12);
    };

    const fetchData = async () => {
        let queryString = '';
        if (diet) {
            queryString = `diet=${diet}`;
        } else if (intolerances) {
            queryString = `intolerances=${intolerances}`;
        } else if (type) {
            queryString = `type=${type}`;
        } else if (cuisine) {
            queryString = `cuisine=${cuisine}`;
        }

        if (queryString) {
            try {
                // let offsetMax = 900;
                // if (cuisine === 'african') offsetMax = 0;
                // else if (cuisine === 'american') offsetMax = 337;
                // else if (cuisine === 'asian') offsetMax = 287;
                // else if (cuisine === 'chinese') offsetMax = 34;
                // else if (cuisine === 'greek') offsetMax = 19;
                // else if (cuisine === 'indian') offsetMax = 112;
                // else if (cuisine === 'italian') offsetMax = 263;
                // else if (cuisine === 'japanese') offsetMax = 20;
                // else if (cuisine === 'korean') offsetMax = 14;
                // else if (cuisine === 'mediterranean') offsetMax = 362;
                // else if (cuisine === 'mexican') offsetMax = 171;
                // else if (cuisine === 'middle eastern') offsetMax = 24;
                // else if (cuisine === 'southern') offsetMax = 91;
                // else if (cuisine === 'thai') offsetMax = 14;
                // else if (cuisine === 'vietnamese') offsetMax = 5;
                // else if (type === 'salad') offsetMax = 237;
                // else if (type === 'soup') offsetMax = 403;
                // else if (type === 'breakfast') offsetMax = 451;

                // const offset = Math.floor(Math.random() * (offsetMax + 1));
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&sort=popularity&${queryString}&number=12&offset=${offset}`);
                const data = await response.json();
                setResults(data.results);
                console.log(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        } else {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&sort=popularity&query=${searchInput}&number=12&offset=${offset}`);
            const data = await response.json();
            console.log(data.results);
            setResults(data.results);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [diet, intolerances, type, cuisine, offset]);


    return (
        <>
            <img src={`${process.env.PUBLIC_URL}/sandwich.jpg`} alt="sandwhich" className="results-img" />
            <div className="result-container">
                <div className="result-header">
                    <h1 className="result-input" style={{ textTransform: 'capitalize' }}>Results for {(searchInput && `${searchInput}`) ||
                        (diet && `${diet}`) || (intolerances && `${intolerances}`) ||
                        (type && `${type}`) || (cuisine && `${cuisine}`)}</h1>
                    <div className="load-more-container">
                        <button className="btn btn-primary load-more-btn" onClick={() => fetchMore()}>Load More</button>
                    </div>
                </div>
                {loading && (<p>Loading...</p>)}
                <div className="result-grid">
                    {results.map((recipe) => (
                        <Recipe key={recipe.id} result={recipe} authorized={authorized} />
                    ))}
                    {results.length === 0 && (<p>No results found.</p>)}
                </div>
            </div>
        </>
    );
};


export default Result;
