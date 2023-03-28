import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {reviewActions} from "../../redux/slices/review.slice";
import {Review} from "../Review/Review";
import "./Reviews.css"
import {UpdateReviewForm} from "../UpdateForm/UpdatedReviewForm";
import {restaurantActions} from "../../redux";


const Reviews = ({restaurant = {}}) => {


    const dispatch = useDispatch();
    // const [id, setId] = useState(restaurantId);
    const [showUpdateReviewForm, setShowUpdateReviewForm] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const {reviews} = useSelector((state) => state.reviewReducer);



    console.log("restaurant prop:", restaurant.id);
    const initialFormReviewValues = {

        id: "",
        comment: "",
        rating: "",
        averageCheck: "",
        restaurantId:""

    };
    const [formReviewValues, setFormReviewValues] = useState(initialFormReviewValues);
    const resetForm = () => {
        setSelectedReview(null);
        setShowUpdateReviewForm(false);
        setFormReviewValues(initialFormReviewValues);
    };
    const handleUpdate = async (id, updatedReview) => {
        await dispatch(reviewActions.updateReview({
            id,
            updatedReview
        }));
        resetForm();
    };


    const handleEdit = (review) => {

        // setFormValues(null);
        setShowUpdateReviewForm(true);
        setSelectedReview(review);
        setFormReviewValues(review);
    };

    // useEffect(() => {
    //     dispatch(reviewActions.getAllReviewsByRestaurant(selectedReview.restaurantId));
    //
    // }, [selectedReview.restaurantId]);

    return (
        <div>
            {selectedReview && (
                <UpdateReviewForm
                    formValues={formReviewValues}
                    setFormValues={setFormReviewValues}
                    review={selectedReview}
                    onUpdate={() => handleUpdate(selectedReview.id, formReviewValues)}
                    onClose={resetForm}

                />

            )}
            <h4>Reviews:</h4>
            <div className="reviews-container">

                {Array.isArray(reviews) ? (reviews.map(review =>
                        <Review key={review.id}
                                review={review}
                                onEdit={handleEdit}

                        />)

                ) : (
                    <p>No reviews found</p>
                )}
            </div>
            <div>

            </div>
        </div>
    );
};

export {Reviews};