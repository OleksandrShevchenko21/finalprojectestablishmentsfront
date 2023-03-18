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

    const [reset, setReset] = useState(false);
    const [restaurantsByRating, setRestaurantsByRating] = useState(false);
    const [restaurantsByNameAsc, setRestaurantsByNameAsc] = useState(false);
    const [restaurantsByNameDesc, setRestaurantsByNameDesc] = useState(false);
    const [restaurantsByRatingGreaterThanEqual, setRestaurantsByRatingGreaterThanEqual] = useState(false);

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
        setRestaurantsByNameAsc(false);
        setRestaurantsByNameDesc(false);
        setRestaurantsByRatingGreaterThanEqual(false);
    }
    const handleByRating = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByRating(true);
    }
    const handleByNameAsc = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByNameAsc(true);
    }
    const handleByNameDesc = () => {
        setReset(true);
        setReset(false);
        setRestaurantsByNameDesc(true);
    }
    const handleByRatingGreaterThanEqual = () => {
        setReset(true);
        setReset(false);

        setRestaurantsByRatingGreaterThanEqual(true);
    }

    const handleGetReview = async ({restaurant = {}}) => {
        console.log(restaurant);
        await dispatch(reviewActions.getAllReviewsByRestaurant(restaurant.id));
    };

    useEffect(() => {
            if (restaurantsByRating) {
                dispatch(restaurantActions.getRestaurantsByRating())
            } else if (restaurantsByNameAsc) {
                dispatch(restaurantActions.getRestaurantsByNameAsc())
            } else if (restaurantsByNameDesc) {
                dispatch(restaurantActions.getRestaurantsByNameDesc())
            } else if (restaurantsByRatingGreaterThanEqual) {
                // setRestaurantsByRatingGreaterThanEqual(false)
                dispatch(restaurantActions.getRestaurantsByRatingGreaterThanEqual(minRating))
                // setMinRating('');
            } else if (reset) {
                dispatch(restaurantActions.getAllRestaurants())
            } else {
                dispatch(restaurantActions.getAllRestaurants())
            }

        }
        ,
        [reset, restaurantsByRating, restaurantsByNameAsc, restaurantsByNameDesc,restaurantsByRatingGreaterThanEqual,minRating]
    )

    // ------------------------------------------------------------
    // ------------------------------------------------------------
    // useEffect(() => {
    //
    //     dispatch(restaurantActions.getRestaurantsByNameDesc())
    //     //     dispatch(restaurantActions.getAllRestaurants())
    //
    // }  , [restaurantsByNameDesc, restaurantsByNameAsc]
    //  )

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
                    handleReset();
                    handleByNameAsc()
                }}>sort by name asc
                </button>
                <button className={"button"} onClick={() => {
                    handleReset();
                    handleByNameDesc()
                }}>sort by name desc
                </button>
                <div className={"buttonWithValue"}>
                    <button className={"button"} onClick={() => {
                        handleReset();
                        handleByRatingGreaterThanEqual()
                    }}>Rating Greater Than Equal
                    </button>
                    <div>
                        {/*<label htmlFor="min-rating-input">Minimum*/}
                        {/*    rating:</label>*/}
                        <input
                            type="number"
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                            // placeholder="Enter minimum rating"
                        />
                    </div>
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
