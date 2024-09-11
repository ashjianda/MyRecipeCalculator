import React from 'react';
import { PiForkKnifeBold } from 'react-icons/pi';
import { LuAlarmCheck } from 'react-icons/lu';
import { AiOutlineLike } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { FaRegCheckSquare, FaRegBookmark } from 'react-icons/fa';

const Recipe = ({ result, authorized }) => {
    return (
        <div className="recipe-icon" onClick={() => window.open(result.sourceUrl, '_blank')}>
            <img className="recipe-image" src={result.image} alt={result.title} />
            {authorized && (<CiHeart className="recipe-favorite" />)}
            <p className="recipe-title">{result.title}</p>

            <div className="recipe-info">
                <div className="recipe-likes">
                    <AiOutlineLike color="#764caa" size="1.5em" /><p>{result.aggregateLikes} Likes</p>
                </div>
                <div className="recipe-details">
                    <LuAlarmCheck color="#764caa" size="1.5em" /><p className="recipe-time">{result.readyInMinutes} Minutes</p>
                    <span className="divider">|</span>
                    <PiForkKnifeBold color="#764caa" size="1.5em" /><p className="recipe-servings">{result.servings} Servings</p>
                </div>
                <div className="recipe-actions">
                    <FaRegBookmark color="#764caa" size="1.5em" /><p className="recipe-bookmark">Save</p>
                    <span className="divider">|</span>
                    <FaRegCheckSquare color="#764caa" size="1.5em" /><p className="recipe-save">Made</p>
                </div>
            </div>
        </div>
    );
};

export default Recipe;