import {useDispatch} from "react-redux";
import {restaurantActions} from "../../redux";
import {reviewActions} from "../../redux/slices/review.slice";
import jwt_decode from "jwt-decode";
import {useState} from "react";


const Review = ({review, onEdit}) => {
    const dispatch = useDispatch();


    const {
        id,
        comment,
        rating,
        averageCheck,
        restaurantId,
        userName
    } = review

    return (
        <div>
            <div>id: {id}</div>
            <div>comment: {comment}</div>
            <div>rating: {rating}</div>
            <div>averageCheck: {averageCheck}</div>
            <div>restaurantId: {restaurantId}</div>
            <div>name: {userName}</div>

            {/*<button*/}
            {/*    onClick={() => dispatch(reviewActions.getReviewByID({id}))}>Select Review*/}
            {/*</button>*/}
            {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID({id}))}>add</button>*/}
            <button
                onClick={() => dispatch(reviewActions.deleteReviewByID({id}))}>delete
            </button>
            <button onClick={() => onEdit(review)}>Edit</button>
        </div>
    );
};
export {Review};