import {useDispatch} from "react-redux";
import {restaurantActions} from "../../redux";
import {reviewActions} from "../../redux/slices/review.slice";
import jwt_decode from "jwt-decode";
import {useState} from "react";
import "./Review.css"
import {newsActions} from "../../redux/slices/news.slices";


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
    const token = localStorage.getItem('token');
    const deleteButton = () => {
        if (token) {
            return (
                <button
                    onClick={() => dispatch(reviewActions.deleteReviewByID({id}))}>delete
                </button>            )
        }
        return null;
    }
    const editButton = () => {
        if (token) {
            return (
                <button onClick={() => onEdit(review)}>Edit</button>
            )
        }
        return null;
    }

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
                {deleteButton()}
                {editButton()}
            </div>
        </div>
    );
};
export {Review};