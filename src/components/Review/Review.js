import {useDispatch} from "react-redux";
import {restaurantActions} from "../../redux";
import {reviewActions} from "../../redux/slices/review.slice";
import jwt_decode from "jwt-decode";
import {useState} from "react";
import "./Review.css"


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
        <div className="main-review-container">
            <div className="second-review-container">
                <div className="comment-container">
                    <textarea>{comment}</textarea>
                </div>
                <div className="first-review-container">
                    {/*<div>id: {id}</div>*/}
                    <div>rating: {rating}</div>
                    <div>averageCheck: {averageCheck}</div>
                    <div>restaurantId: {restaurantId}</div>
                    <div>name: {userName}</div>
                </div>
            </div>
            <div>
                <button
                    onClick={() => dispatch(reviewActions.deleteReviewByID({id}))}>delete
                </button>
                <button onClick={() => onEdit(review)}>Edit</button>
            </div>
        </div>
    );
};
export {Review};