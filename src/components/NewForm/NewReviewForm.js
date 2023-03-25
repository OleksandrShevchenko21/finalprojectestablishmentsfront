import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import "./NewReviewForm.css"
import {reviewActions} from "../../redux/slices/review.slice";
import jwt_decode from "jwt-decode";


const NewReviewForm = ({restaurant, onSubmit}) => {
    console.log(restaurant);
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.reviewReducer);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [averageCheck, setAverageCheck] = useState('');
    const [userName, setUserName] = useState(null);


    const handleSubmit = (e) => {
        const newReview = {
            comment,
            rating,
            averageCheck,
            restaurantId: restaurant.id,
            userName: userName

        };
        e.preventDefault();

        const jsonBody = JSON.stringify(newReview);

        dispatch(reviewActions.saveNewReview(newReview))

        setComment('');
        setRating('');
        setAverageCheck('');
        onSubmit && onSubmit();
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const tokenUserName = decodedToken.sub;

            setUserName(tokenUserName);
        }
    }, []);
    console.log("userName: " + userName);
    // console.log(token);

    return (
        <form onSubmit={handleSubmit}>
            <div className="main-newReviewForm-container">
                <div>
                    <div className="singleForm-newReviewForm-container">

                        <textarea
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="your comment"
                        />
                    </div>
                    <div className="sub-newReviewForm-container">
                        <div className="singleForm-newReviewForm-container">

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
                        <div className="singleForm-newReviewForm-container">

                            <input
                                type="text"
                                value={averageCheck}
                                onChange={(e) => setAverageCheck(e.target.value)}
                                placeholder="how much you spent"
                            />

                        </div>

                <button type="submit">Add Review</button>
                    </div>
                </div>



            </div>
        </form>
    )
        ;
}
export {NewReviewForm};