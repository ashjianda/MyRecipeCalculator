import React from "react";
import { useNavigate } from "react-router-dom";

const OneClickSearch = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const fetchQuery = (queryType, value) => {
        navigate(`/result?${queryType}=${value}`);
    };

    return (
        <div className="collapse-section">
            <ul className="bulletless">
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("diet", "vegetarian")}>Vegetarian</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("diet", "vegan")}>Vegan</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("intolerances", "gluten")}>Gluten Free</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("intolerances", "dairy")}>Dairy Free</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("intolerances", "peanut,treenut")}>Nut Free</button>
                </li>
            </ul>
            <ul className="bulletless">
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "main course")}>Main Courses</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "side dish")}>Side Dishes</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "dessert")}>Desserts</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "appetizer")}>Appetizers</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "breakfast")}>Breakfast</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "soup")}>Soups</button>
                </li>
                <li>
                    <button className="search-category btn btn-link" onClick={() => fetchQuery("type", "salad")}>Salads</button>
                </li>
            </ul>
            {isOpen && (
                <>
                    <ul className="bulletless">
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "african")}>African</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "american")}>American</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "asian")}>Asian</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "chinese")}>Chinese</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "greek")}>Greek</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "indian")}>Indian</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "italian")}>Italian</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "japanese")}>Japanese</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "korean")}>Korean</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "mediterranean")}>Mediterranean</button>
                        </li>
                    </ul>
                    <ul className="bulletless">
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "mexican")}>Mexican</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "middle eastern")}>Middle Eastern</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "southern")}>Southern</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "thai")}>Thai</button>
                        </li>
                        <li>
                            <button className="search-category btn btn-link" onClick={() => fetchQuery("cuisine", "vietnamese")}>Vietnamese</button>
                        </li>
                    </ul>
                </>
            )}
            <div className="toggle-onclick-container">
                <button className="toggle-onclick-btn btn btn-link" onClick={toggle}>{isOpen ? "View Less" : "View More"}</button>
            </div>
        </div>
    );
};

export default OneClickSearch;
