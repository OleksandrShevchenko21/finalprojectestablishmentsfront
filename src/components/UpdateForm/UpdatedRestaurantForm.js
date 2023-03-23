import {restaurantActions} from "../../redux";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./UpdatedRestaurantForm.css"

const UpdateRestaurantForm = ({restaurant, onUpdate, onClose, resetForm}) => {

    console.log(restaurant);

    const {status, error}
        = useSelector((state) => state.restaurantReducer);
    const [id, setId] = useState(restaurant.id);
    const [restaurantName, setRestaurantName] = useState(restaurant.restaurantName);
    const [type, setType] = useState(restaurant.type);
    const [address, setAddress] = useState(restaurant.address);
    const [schedule, setSchedule] = useState(restaurant.schedule);
    const [contacts, setContacts] = useState(restaurant.contacts);
    const [averageCheck, setAverageCheck] = useState(restaurant.averageCheck);
    const [dateOfPublish, setDateOfPublish] = useState(restaurant.dateOfPublish);

    useEffect(() => {
        setId(restaurant.id);
        setRestaurantName(restaurant.restaurantName);
        setType(restaurant.type);
        setAddress(restaurant.address);
        setSchedule(restaurant.schedule);
        setContacts(restaurant.contacts);
        setAverageCheck(restaurant.averageCheck);
        setDateOfPublish(restaurant.dateOfPublish);
    }, [restaurant]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRestaurant = {
            // id,
            restaurantName,
            type,
            address,
            schedule,
            contacts,
            averageCheck,
            dateOfPublish
        };

        dispatch(restaurantActions.updateRestaurant({id, updatedRestaurant}));
        onUpdate(id, updatedRestaurant);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="update-main-container">
                {/*<div className="restaurant-single-container">*/}
                {/*    <div>*/}
                {/*        <label>Restaurant ID:</label>*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            value={id}*/}
                {/*            onChange={(e) => setId(e.target.value)}*/}
                {/*            readOnly*/}
                {/*        />*/}
                {/*    </div>*/}
                <div className="restaurant-single-container">
                    {/*<label>Name:</label>*/}
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                </div>
                <div className="restaurant-single-container">
                    {/*<label>Type:</label>*/}
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="restaurant-single-container">
                    {/*<label>Address:</label>*/}
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="restaurant-single-container">
                    {/*<label>Schedule:</label>*/}
                    <input
                        type="text"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}/>
                </div>
                <div className="restaurant-single-container">
                    {/*<label>Contacts:</label>*/}
                    <input
                        type="text"
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}/>
                </div>
                <div className="restaurant-single-container">
                    {/*<label>Average Check:</label>*/}
                    <input
                        type="text"
                        value={averageCheck}
                        onChange={(e) => setAverageCheck(e.target.value)}/>
                </div>
                <div className="restaurant-single-container">
                    {/*<label>Date of publish:</label>*/}
                    <input
                        type="text"
                        value={dateOfPublish}
                        onChange={(e) => setDateOfPublish(e.target.value)}/>
                </div>
                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    )
        ;
}
export {UpdateRestaurantForm};