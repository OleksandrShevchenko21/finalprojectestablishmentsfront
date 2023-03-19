import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import {Restaurant} from "../Restaurant/Restaurant";
import "./Restaurants.css";
import {UpdateRestaurantForm} from "../UpdateForm/UpdatedRestaurantForm";
import {NewReviewForm} from "../NewForm/NewReviewForm";
import {reviewActions} from "../../redux/slices/review.slice";
import {Reviews} from "../Reviews/Reviews";
import {UpdateReviewForm} from "../UpdateForm/UpdatedReviewForm";

const Restaurants = () => {
    const dispatch = useDispatch();
    const [showUpdateRestaurantForm, setShowUpdateRestaurantForm] = useState(false);
    const [showUpdateReviewForm, setShowUpdateReviewForm] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const {restaurants} = useSelector((state) => state.restaurantReducer);


    const {reviews} = useSelector((state) => state.reviewReducer);

    const initialFormRestaurantValues = {

        id: "",
        restaurantName: "",
        type: "",
        address: "",
        schedule: "",
        contacts: "",
        averageCheck: "",
        dateOfPublish: ""
    };
    const initialFormReviewValues = {

        id: "",
        comment: "",
        rating: "",
        averageCheck: "",
        restaurantId: ""

    };
    const [formRestaurantValues, setFormRestaurantValues] = useState(initialFormRestaurantValues);
    const [formReviewValues, setFormReviewValues] = useState(initialFormReviewValues);

    const [minRating, setMinRating] = useState(0);
    const [type, setType] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [minCheck, setMinCheck] = useState(0);
    const [maxCheck, setMaxCheck] = useState(1500000);

    const [reset, setReset] = useState(false);
    const [restaurantsByRating, setRestaurantsByRating] = useState(false);
    const [restaurantsByName, setRestaurantsByName] = useState(false);
    const [restaurantsByNameAsc, setRestaurantsByNameAsc] = useState(false);
    const [restaurantsByRatingGreaterThanEqual, setRestaurantsByRatingGreaterThanEqual] = useState(false);
    const [restaurantsByType, setRestaurantsByType] = useState(false);
    const [restaurantsByAverageCheck, setRestaurantsByAverageCheck] = useState(false);
    const [restaurantsByPublishDate, setRestaurantsByPublishDate] = useState(false);
    const [restaurantsByPublishDateAsc, setRestaurantsByPublishDateAsc] = useState(false);
    const [restaurantsFindByName, setRestaurantsFindByName] = useState(false);

    const resetForm = () => {
        setSelectedRestaurant(null);
        setSelectedReview(null);
        setShowUpdateRestaurantForm(false);
        setShowUpdateReviewForm(false);
        setFormRestaurantValues(initialFormRestaurantValues);
        setFormReviewValues(initialFormReviewValues);

    };
    const handleUpdate = async (id, updatedRestaurant) => {
        await dispatch(restaurantActions.updateRestaurant({
            id,
            updatedRestaurant
        }));
        resetForm();
    };

    const handleEdit = (restaurant) => {

        // setFormValues(null);
        setShowUpdateRestaurantForm(true);
        setSelectedRestaurant(restaurant);
        setFormRestaurantValues(restaurant);
    };

    const handleReset = () => {
        setReset(true);
        setRestaurantsByRating(false);
        setRestaurantsByName(false);
        setRestaurantsByRatingGreaterThanEqual(false);
        setRestaurantsByType(false);
        setRestaurantsByAverageCheck(false);
        setRestaurantsByPublishDate(false);
        setRestaurantsFindByName(false);
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
    const handleFindByName = () => {
        setReset(true);
        setReset(false);
        setRestaurantsFindByName(true);
    }
    const submitHandler = (e) => {
        e.preventDefault();

    }

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
    // const handleGetReview = async ({restaurant = {}}) => {
    //     console.log(restaurant);
    //     await dispatch(reviewActions.getAllReviewsByRestaurant(restaurant.id));
    // };

    useEffect(() => {
            if (restaurantsByRating) {
                dispatch(restaurantActions.getRestaurantsByRating())

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
            restaurantsByRating,
            restaurantsByName,
            restaurantsByNameAsc,
            restaurantsFindByName,
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

    // ------------------------------------------------------------
    // ------------------------------------------------------------
    useEffect(() => {

    dispatch(restaurantActions.getRestaurantsFindByName(restaurantName))

    }  , [restaurantName]
     )

    return (
        <div>
            {selectedRestaurant && (
                <UpdateRestaurantForm
                    formValues={formRestaurantValues}
                    setFormValues={setFormRestaurantValues}
                    restaurant={selectedRestaurant}
                    onUpdate={() => handleUpdate(selectedRestaurant.id, formRestaurantValues)}
                    onClose={resetForm}

                />

            )}
            <div className={"sortButton"}>
                <h4>Restaurants:</h4>
                <button className={"button"} onClick={handleReset}>reset
                </button>
                <button className={"button"} onClick={() => {
                    handleReset();
                    handleByRating()
                }}>sort by rating
                </button>

                <button className={"button"} onClick={() => {
                    setRestaurantsByNameAsc(prevState => !prevState);
                    handleReset();
                    handleByName()
                }}> {restaurantsByNameAsc ? 'by Name Desc' : 'by Name Asc'}
                </button>

                <button className={"button"} onClick={() => {
                    setRestaurantsByPublishDateAsc(prevState => !prevState);
                    handleReset();
                    handleByPublishDate()
                }}> {restaurantsByPublishDateAsc ? 'by Date Desc' : 'by Date Asc'}
                </button>

                <div className={"buttonWithValue"}>

                    <button className={"button"} onClick={() => {
                        handleReset();
                        handleByRatingGreaterThanEqual()
                    }}>Rating Greater Than Equal
                    </button>

                    <div>
                        <input
                            type="number"
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"buttonWithValue"}>

                    <button className={"button"} onClick={() => {
                        handleReset();
                        handleByType()
                    }}>Type
                    </button>

                    <div>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Enter type"
                        />
                    </div>

                </div>

                <div className={"buttonWithValue"}>

                    <button className={"button"} onClick={() => {
                        handleReset();
                        handleByAverageCheck()
                    }}>Average Check
                    </button>

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

                </div>

                <div className="searchBar">

                    <form onSubmit={submitHandler}>
                        <input type="text"
                               value={restaurantName}
                               placeholder="Search Restaurant"
                               onChange={(e) =>setRestaurantName(e.target.value)}/>

                    </form>

                </div>

            </div>

            <div className="restaurants-container">

                {Array.isArray(restaurants) ? (restaurants.map(restaurant =>
                        <Restaurant key={restaurant.id}
                                    restaurant={restaurant}
                            // review={review}
                                    onEdit={handleEdit}
                            // getReviews={handleGetReview}
                        />)
                ) : (
                    <p>No restaurants found</p>
                )}
            </div>

        </div>
    );

}
export {Restaurants};
