import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";
import {UpdateRestaurantForm} from "../UpdateForm/UpdatedRestaurantForm";
import {useEffect, useState} from "react";
import {Restaurants} from "../Restaurants/Restaurants";
import "./Restaurant.css"
import {Reviews} from "../Reviews/Reviews";
import {reviewActions} from "../../redux/slices/review.slice";
import {NewReviewForm} from "../NewForm/NewReviewForm";

const Restaurant = ({restaurant = {}, onEdit}) => {
    const dispatch = useDispatch();
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);

    const [showAllReviews, setShowAllReviews] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);


    const {
        id,
        restaurantName,
        type,
        address,
        schedule,
        contacts,
        averageCheck,
        dateOfPublish

    } = restaurant
    const{reviews:data}=useSelector(state=>state.reviewReducer)


    const handleSelectRestaurant = () => {
        // setShowAllReviews(false);
        dispatch(restaurantActions.getRestaurantByID(id));
        setSelectedRestaurant(restaurant);
    };

    const handleGetReview = async (restaurant) => {

            await dispatch(reviewActions.getAllReviewsByRestaurant(restaurant.id));

    };
    const handleAddReview = async () => {
        setShowAddReviewForm(false);

    };

    // useEffect(() => {
    //     // Clear reviews data in the Redux store when a new restaurant is selected
    //     if (restaurant.id !== null && restaurant.id !== id) {
    //         dispatch(reviewActions.clearReviews());
    //     }
    // }, [dispatch, id]);

    return (
        <div className={"restaurant-info-container"}>
            <div>

                <div>id: {id}</div>
                <div>name: {restaurantName}</div>
                <div>type: {type}</div>
                <div>address: {address}</div>
                <div>schedule: {schedule}</div>
                <div>contacts: {contacts}</div>
                <div>averageCheck: {averageCheck}</div>
                <div>date of publish: {dateOfPublish}</div>
                {/*<button onClick={()=>dispatch(restaurantActions.setCurrentRestaurant(restaurant))}>select</button>*/}

                {/*<Reviews restaurant={restaurant}/>*/}
            </div>
            <div className={"restaurant-button-container"}>
                <button onClick={handleSelectRestaurant}>Select Restaurant
                </button>

                <button
                    onClick={() => dispatch(restaurantActions.deleteRestaurantByID({id}))}>delete
                </button>
                <button onClick={() => onEdit(restaurant)}>Edit</button>
                {/*<button onClick={() => getReviews(restaurant)}>see all reviews</button>*/}

                <button onClick={() => {
                    setShowAllReviews(prevState => !prevState);
                    handleGetReview(restaurant);
                }}>
                    {showAllReviews ? 'hide' : 'see reviews'}
                </button>

                <button
                    onClick={() => setShowAddReviewForm(prevState => !prevState)}>
                                 {showAddReviewForm ? 'Cancel' : 'Add Review'}
                </button>
                {showAllReviews && <Reviews restaurant={restaurant}/>}

                {showAddReviewForm && (
                    <NewReviewForm restaurant={restaurant}
                                   onSubmit={handleAddReview}/>
                )}

            </div>


        </div>
    );

};
export {Restaurant};