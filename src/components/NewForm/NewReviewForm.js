import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import "./NewReviewForm.css"
import {reviewActions} from "../../redux/slices/review.slice";
import jwt_decode from "jwt-decode";
import {User} from "../User/User";


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
    // const token = localStorage.getItem("token");
    // const tokenUserName = decodedToken.sub; // Assuming sub contains the user's name
    // const user = User.findOne({ where: { name: tokenUserId } }); // Fetch user from database using name
    // const tokenUserId = user.id; // Get the user's ID from the fetched user object


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            const tokenUserName = decodedToken.sub; // Assuming sub contains the user's ID

            setUserName(tokenUserName);
        }
    }, []);
    console.log("userName: " + userName);
    // console.log(token);

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