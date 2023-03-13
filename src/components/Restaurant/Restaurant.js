import {useDispatch} from "react-redux";
import {restaurantActions} from "../../redux";
import {UpdateRestaurantForm} from "./UpdatedRestaurantForm";
import {useState} from "react";
import {Restaurants} from "../Restaurants/Restaurants";

const Restaurant = ({restaurant, onEdit}) => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        restaurantName,
        type,
        address,
        schedule,
        contacts,
        averageCheck
    } = restaurant
    const jsonBody = JSON.stringify(restaurant);
    // const handleEdit = () => {
    //     // Open a modal dialog or a separate page with the UpdateRestaurantForm component
    //     // and pass the selected restaurant object as a prop
    //     const updatedRestaurantForm = <UpdateRestaurantForm restaurant={restaurant} />;
    //     // ...
    // };
    const [showEditForm, setShowEditForm] = useState(false);

    const handleEdit = () => {
        setShowEditForm(true);
    };

    return (
        <div>
            <div>id: {id}</div>
            <div>name: {restaurantName}</div>
            <div>type: {type}</div>
            <div>address: {address}</div>
            <div>schedule: {schedule}</div>
            <div>contacts: {contacts}</div>
            <div>averageCheck: {averageCheck}</div>
            {/*<button onClick={()=>dispatch(restaurantActions.setCurrentRestaurant(restaurant))}>select</button>*/}
            <button
                onClick={() => dispatch(restaurantActions.getRestaurantByID({id}))}>Select
                Restaurant
            </button>
            {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID({id}))}>add</button>*/}
            <button onClick={() => dispatch(restaurantActions.deleteRestaurantByID({id}))}>delete</button>
            <button onClick={() => onEdit(restaurant)}>Edit</button>
        </div>
    );

};
export {Restaurant};