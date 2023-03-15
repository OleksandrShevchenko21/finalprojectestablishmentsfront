import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {reviewActions} from "../../redux/slices/review.slice";
import {Review} from "../Review/Review";
import "./Reviews.css"
import {UpdateReviewForm} from "../UpdateForm/UpdatedReviewForm";


const Reviews = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const {reviews} = useSelector((state) => state.reviewReducer);

    const initialFormValues = {

        id: "",
        comment: "",
        rating: "",
        averageCheck: ""

    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedReview(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
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
        setShowUpdateForm(true);
        setSelectedReview(review);
        setFormValues(review);
    };
    useEffect(() => {
        dispatch(reviewActions.getAllReviews())
    }, [])
    return (
        <div>
            {selectedReview && (
                <UpdateReviewForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    review={selectedReview}
                    onUpdate={() => handleUpdate(selectedReview.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <h4>Reviews:</h4>
            <div className="reviews-container">

                {Array.isArray(reviews) ? (reviews.map(review =>
                        <Review key={review.id}
                              review={review}
                              onEdit={handleEdit}/>)
                ) : (
                    <p>No reviews found</p>
                )}
            </div>
        </div>
    );
};

export {Reviews};