import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import {Restaurant} from "../Restaurant/Restaurant";
import "./Restaurants.css";
import {UpdateRestaurantForm} from "../UpdateForm/UpdatedRestaurantForm";

const Restaurants = () => {
    const dispatch = useDispatch();
    const [showUpdateRestaurantForm, setShowUpdateRestaurantForm] = useState(false);
    const [showUpdateReviewForm, setShowUpdateReviewForm] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const {restaurants} = useSelector((state) => state.restaurantReducer);


    // const {reviews} = useSelector((state) => state.reviewReducer);

    const initialFormRestaurantValues = {

        id: "",
        restaurantName: "",
        type: "",
        address: "",
        schedule: "",
        contacts: "",
        averageCheck: "",
        dateOfPublish: ""
    };
    // const initialFormReviewValues = {
    //
    //     id: "",
    //     comment: "",
    //     rating: "",
    //     averageCheck: "",
    //     restaurantId: ""
    //
    // };
    const [formRestaurantValues, setFormRestaurantValues] = useState(initialFormRestaurantValues);
    // const [formReviewValues, setFormReviewValues] = useState(initialFormReviewValues);

    const resetForm = () => {
        setSelectedRestaurant(null);
        setSelectedReview(null);
        setShowUpdateRestaurantForm(false);
        setShowUpdateReviewForm(false);
        setFormRestaurantValues(initialFormRestaurantValues);
        // setFormReviewValues(initialFormReviewValues);

    };
    const handleUpdate = async (id, updatedRestaurant) => {
        await dispatch(restaurantActions.updateRestaurant({
            id,
            updatedRestaurant
        }));
        resetForm();
    };

    const handleEdit = (restaurant) => {

        // setFormValues(null);
        setShowUpdateRestaurantForm(true);
        setSelectedRestaurant(restaurant);
        setFormRestaurantValues(restaurant);
    };

    useEffect(() => {
            dispatch(restaurantActions.getAllRestaurants())
        },
        [])

    return (
        <div>
            {selectedRestaurant && (
                <UpdateRestaurantForm
                    formValues={formRestaurantValues}
                    setFormValues={setFormRestaurantValues}
                    restaurant={selectedRestaurant}
                    onUpdate={() => handleUpdate(selectedRestaurant.id, formRestaurantValues)}
                    onClose={resetForm}

                />

            )}

            <div className="restaurants-container">

                {Array.isArray(restaurants) ? (restaurants.map(restaurant =>
                        <Restaurant key={restaurant.id}
                                    restaurant={restaurant}
                                    onEdit={handleEdit}
                        />)
                ) : (
                    <p>No restaurants found</p>
                )}
            </div>

        </div>
    );

}
export {Restaurants};
