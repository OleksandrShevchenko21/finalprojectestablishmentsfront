import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reviewActions} from "../../redux/slices/review.slice";


const UpdateReviewForm = ({review, onUpdate, onClose, resetForm}) => {

    console.log(review);

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

        const jsonBody = JSON.stringify(updatedReview);

        dispatch(reviewActions.updateReview({id, updatedReview}));
        onUpdate(id, updatedReview);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div>
                    <label>Review ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        readOnly
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
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

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateReviewForm};