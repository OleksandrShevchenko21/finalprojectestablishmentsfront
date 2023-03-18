import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import "./NewReviewForm.css"
import {reviewActions} from "../../redux/slices/review.slice";


const NewReviewForm = ({restaurant, onSubmit}) => {
    console.log(restaurant);
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.reviewReducer);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [averageCheck, setAverageCheck] = useState('');


    const handleSubmit = (e) => {
        const newReview = {
            comment,
            rating,
            averageCheck,
            restaurantId:restaurant.id

        };
        e.preventDefault();

        const jsonBody = JSON.stringify(newReview);
        console.log(jsonBody);

       dispatch(reviewActions.saveNewReview(newReview))

        setComment('');
        setRating('');
        setAverageCheck('');
        onSubmit && onSubmit();


    };
        // setRestaurantId(restaurant.id)
    return (
        <form onSubmit={handleSubmit}>
                    <div className="form-container">
                <div className="singleForm-container">
                    <label>Comment:</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Rating:</label>
                    <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Check:</label>
                    <input
                        type="text"
                        value={averageCheck}
                        onChange={(e) => setAverageCheck(e.target.value)}
                    />
                </div>


                <button type="submit">Add Review</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewReviewForm};