import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import {Restaurant} from "../Restaurant/Restaurant";
import "./Restaurants.css"
import {UpdateRestaurantForm} from "../Restaurant/UpdatedRestaurantForm";


const Restaurants = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const { restaurants } = useSelector((state) => state.restaurantReducer);

    const handleUpdate = async (id, updatedRestaurant) => {
        await dispatch(restaurantActions.updateRestaurant({ id, updatedRestaurant }));
        setShowUpdateForm(false);
    };

    const handleEdit = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowUpdateForm(true);
    };
    useEffect(() => {
        dispatch(restaurantActions.getAllRestaurants())
    }, [])
    return (
        <div>
            {selectedRestaurant && (
                <UpdateRestaurantForm
                    restaurant={selectedRestaurant}
                    onUpdate={handleUpdate}
                    onClose={() => {
                        setSelectedRestaurant(null);
                        setShowUpdateForm(false);
                    }}
                />

            )}
            <h4>Restaurants:</h4>
            <div className="restaurants-container">

                {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID())}>add</button>*/}
                {/*{Array.isArray(restaurants) ? (restaurants.map(restaurant => <Restaurant key={restaurant.id}*/}
                {Array.isArray(restaurants) ? (restaurants.map(restaurant =>
                        <Restaurant key={restaurant.id}
                                    restaurant={restaurant}onEdit={handleEdit}/>)
                ) : (
                    <p>No restaurants found</p>
                )}
            </div>
        </div>
    );
};
export {Restaurants};