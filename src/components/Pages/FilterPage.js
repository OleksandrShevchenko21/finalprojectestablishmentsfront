import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import "./FilterPage.css"


const FilterPage = () => {
    const dispatch = useDispatch();

    const [minRating, setMinRating] = useState(0);
    const [type, setType] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [minCheck, setMinCheck] = useState(0);
    const [maxCheck, setMaxCheck] = useState(1500000);

    const [reset, setReset] = useState(false);
    const [restaurantsByRating, setRestaurantsByRating] = useState(false);
    const [restaurantsByRatingAsc, setRestaurantsByRatingAsc] = useState(false);
    const [restaurantsByName, setRestaurantsByName] = useState(false);
    const [restaurantsByNameAsc, setRestaurantsByNameAsc] = useState(false);
    const [restaurantsByRatingGreaterThanEqual, setRestaurantsByRatingGreaterThanEqual] = useState(false);
    const [restaurantsByType, setRestaurantsByType] = useState(false);
    const [restaurantsByAverageCheck, setRestaurantsByAverageCheck] = useState(false);
    const [restaurantsByPublishDate, setRestaurantsByPublishDate] = useState(false);
    const [restaurantsByPublishDateAsc, setRestaurantsByPublishDateAsc] = useState(false);

    const handleReset = () => {
        setReset(true);
        setRestaurantsByRating(false);
        setRestaurantsByName(false);
        setRestaurantsByRatingGreaterThanEqual(false);
        setRestaurantsByType(false);
        setRestaurantsByAverageCheck(false);
        setRestaurantsByPublishDate(false);
    }
    const handleByRating = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByRating(true);
    }
    const handleByName = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByName(true);
    }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    // }

    const handleByRatingGreaterThanEqual = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByRatingGreaterThanEqual(true);
    }
    const handleByType = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByType(true);
    }
    const handleByAverageCheck = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByAverageCheck(true);
    }
    const handleByPublishDate = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByPublishDate(true);
    }

    useEffect(() => {
            if (restaurantsByRating) {
                if (restaurantsByRatingAsc) {
                    dispatch(restaurantActions.getRestaurantsByRatingAsc());
                } else {
                    dispatch(restaurantActions.getRestaurantsByRatingDesc())
                }

            } else if (restaurantsByRatingGreaterThanEqual) {
                dispatch(restaurantActions.getRestaurantsByRatingGreaterThanEqual(minRating))

            } else if (restaurantsByType) {
                dispatch(restaurantActions.getRestaurantsByType(type))

            } else if (restaurantsByAverageCheck) {
                dispatch(restaurantActions.getRestaurantsByAverageCheck({
                    minCheck,
                    maxCheck
                }))

            } else if (restaurantsByName) {
                if (restaurantsByNameAsc) {
                    dispatch(restaurantActions.getRestaurantsByNameAsc());
                } else {
                    dispatch(restaurantActions.getRestaurantsByNameDesc())
                }

            } else if (restaurantsByPublishDate) {
                if (restaurantsByPublishDateAsc) {
                    dispatch(restaurantActions.getRestaurantsByPublishDateAsc());
                } else {
                    dispatch(restaurantActions.getRestaurantsByPublishDateDesc())
                }

            } else if (reset) {
                dispatch(restaurantActions.getAllRestaurants())
            } else {
                dispatch(restaurantActions.getAllRestaurants())
            }

        }
        ,
        [reset,
            restaurantsByRatingAsc,
            restaurantsByName,
            restaurantsByNameAsc,
            // restaurantsFindByName,
            restaurantsByRatingGreaterThanEqual,
            restaurantsByType,
            restaurantsByAverageCheck,
            restaurantsByPublishDate,
            restaurantsByPublishDateAsc,
            minRating,
            type,
            minCheck,
            maxCheck,
            // restaurantName
        ]
    )


    return (
        <div className="sort-filter-main">
            <button className="single-button" onClick={handleReset}>reset
            </button>
            <button className="single-button" onClick={() => {
                setRestaurantsByRatingAsc(prevState => !prevState);
                handleReset();
                handleByRating()
            }}> {restaurantsByRatingAsc ? 'by Rating Desc' : 'by Rating Asc'}
            </button>

            <button className="single-button" onClick={() => {
                setRestaurantsByNameAsc(prevState => !prevState);
                handleReset();
                handleByName()
            }}> {restaurantsByNameAsc ? 'by Name Desc' : 'by Name Asc'}
            </button>

            <button className="single-button" onClick={() => {
                setRestaurantsByPublishDateAsc(prevState => !prevState);
                handleReset();
                handleByPublishDate()
            }}> {restaurantsByPublishDateAsc ? 'by Date Desc' : 'by Date Asc'}
            </button>

            <div className="name-value-button-container">

                <label>Rating Greater: </label>
                <div className="value-button-container">

                    <div>
                        <input
                            type="number"
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                        />
                    </div>
                    <button className="single-button" onClick={() => {
                        handleReset();
                        handleByRatingGreaterThanEqual()
                    }}>ok
                    </button>
                </div>
            </div>

            <div className="name-value-button-container">
                <label>Type: </label>
                <div className="value-button-container">
                    <div>
                        <select id="type-select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}>
                            <option value="">Select a type</option>
                            <option value="BAR">Bar</option>
                            <option value="Restaurant">Restaurant</option>
                        </select>
                    </div>

                    <button className="single-button" onClick={() => {
                        handleReset();
                        handleByType()
                    }}>ok
                    </button>
                </div>
            </div>

            <div className="name-value-button-container">
                <label>Average check: </label>
                <div className="value-button-container">
                    <div>
                        <input
                            type="number"
                            value={minCheck}
                            onChange={(e) => setMinCheck(e.target.value)}
                            placeholder="Enter min check value"
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            value={maxCheck}
                            onChange={(e) => setMaxCheck(e.target.value)}
                            placeholder="Enter max check value"
                        />
                    </div>

                    <button className="single-button" onClick={() => {
                        handleReset();
                        handleByAverageCheck()
                    }}>ok
                    </button>
                </div>

            </div>
        </div>
    );
}
export {FilterPage};
