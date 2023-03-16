import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";
import {UpdateRestaurantForm} from "../UpdateForm/UpdatedRestaurantForm";
import {useEffect, useState} from "react";
import {Restaurants} from "../Restaurants/Restaurants";
import "./Restaurant.css"
import {Reviews} from "../Reviews/Reviews";
import {reviewActions} from "../../redux/slices/review.slice";
import {NewReviewForm} from "../NewForm/NewReviewForm";

const Restaurant = ({restaurant, onEdit,getReviews}) => {
    const dispatch = useDispatch();
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);

    const {
        id,
        restaurantName,
        type,
        address,
        schedule,
        contacts,
        averageCheck,
    } = restaurant

    const handleAddReview = async (newReview) => {
      await dispatch(reviewActions.saveNewReview(newReview)).then(() => {
          setShowAddReviewForm(false);
      });
    };

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
                {/*<button onClick={()=>dispatch(restaurantActions.setCurrentRestaurant(restaurant))}>select</button>*/}

                {/*<Reviews restaurant={restaurant}/>*/}
            </div>
            <div className={"restaurant-button-container"}>

                <button
                    onClick={() => dispatch(restaurantActions.getRestaurantByID({id}))}>Select
                    Restaurant
                </button>
                {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID({id}))}>add</button>*/}
                <button
                    onClick={() => dispatch(restaurantActions.deleteRestaurantByID({id}))}>delete
                </button>
                <button onClick={() => onEdit(restaurant)}>Edit</button>
                <button onClick={() => getReviews(restaurant)}>see all reviews</button>
                {/*<button onClick={() => addReview(restaurant)}>add Review</button>*/}
                <button onClick={() => setShowAddReviewForm(true)}>Add Review</button>
                {showAddReviewForm && (
                    <NewReviewForm restaurant={restaurant} onSubmit={handleAddReview} />
                )}

            </div>


        </div>
    );

};
export {Restaurant};