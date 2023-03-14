import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import {Restaurant} from "../Restaurant/Restaurant";
import "./Restaurants.css";
import {UpdateRestaurantForm} from "../Restaurant/UpdatedRestaurantForm";

const Restaurants = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const {restaurants} = useSelector((state) => state.restaurantReducer);

    const initialFormValues = {

        id: "",
        restaurantName: "",
        type: "",
        address: "",
        schedule: "",
        contacts: "",
        averageCheck: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedRestaurant(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
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
        setShowUpdateForm(true);
        setSelectedRestaurant(restaurant);
        setFormValues(restaurant);
    };
    useEffect(() => {
        dispatch(restaurantActions.getAllRestaurants())
    }, [])
    return (
        <div>
            {selectedRestaurant && (
                <UpdateRestaurantForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    restaurant={selectedRestaurant}
                    onUpdate={() => handleUpdate(selectedRestaurant.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <h4>Restaurants:</h4>
            <div className="restaurants-container">

                {Array.isArray(restaurants) ? (restaurants.map(restaurant =>
                        <Restaurant key={restaurant.id}
                                    restaurant={restaurant}
                                    onEdit={handleEdit}/>)
                ) : (
                    <p>No restaurants found</p>
                )}
            </div>
        </div>
    );
};
export {Restaurants};
