import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reviewActions} from "../../redux/slices/review.slice";
import "./UpdatedReviewForm.css"


const UpdateReviewForm = ({review, onUpdate, onClose, resetForm}) => {

    const {status, error}
        = useSelector((state) => state.reviewReducer);
    const [id, setId] = useState(review.id);
    const [comment, setComment] = useState(review.comment);
    const [rating, setRating] = useState(review.rating);
    const [averageCheck, setAverageCheck] = useState(review.averageCheck);


    useEffect(() => {
        setId(review.id);
        setComment(review.comment);
        setRating(review.rating);
        setAverageCheck(review.averageCheck);

    }, [review]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReview = {
            // id,
            comment,
            rating,
            averageCheck
        };

        dispatch(reviewActions.updateReview({id, updatedReview}))
        //     .then(()=>{
        // dispatch(reviewActions.getAllReviewsByRestaurant(currentReview.restaurantId))
        // });
        onUpdate(id, updatedReview);


    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="main-updated-review-form-container">
                <div className="single-updated-review-form-container">
                    <label>Review ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        readOnly
                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="rating-check-container">
                <div>
                    <label>Rating:</label>
                    <select id="rating-select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                        <option value="">rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>
                </div>
                <div>
                    <label>Check:</label>
                    <input
                        type="text"
                        value={averageCheck}
                        onChange={(e) => setAverageCheck(e.target.value)}
                    />
                </div>
                <button type="submit">update</button>
                </div>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateReviewForm};