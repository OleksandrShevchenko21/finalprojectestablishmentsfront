import {restaurantActions} from "../../redux";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const UpdateRestaurantForm = ({...restaurant}) => {


    const {status, error}
        = useSelector((state) => state.restaurantReducer);
    const [id, setId] = useState(restaurant.id);
    const [restaurantName, setRestaurantName] = useState(restaurant.restaurantName);
    const [type, setType] = useState(restaurant.type);
    const [address, setAddress] = useState(restaurant.address);
    const [schedule, setSchedule] = useState(restaurant.schedule);
    const [contacts, setContacts] = useState(restaurant.contacts);
    const [averageCheck, setAverageCheck] = useState(restaurant.averageCheck);

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRestaurant = {
            id,
            restaurantName,
            type,
            address,
            schedule,
            contacts,
            averageCheck,
        };

        const jsonBody = JSON.stringify(updatedRestaurant);
        console.log(jsonBody);
        dispatch(restaurantActions.updateRestaurant({id, updatedRestaurant}));

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div>
                    <label>Restaurant ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Schedule:</label>
                    {/*<textarea */}
                    <input
                        type="text"
                        value={schedule}
                              onChange={(e) => setSchedule(e.target.value)}/>
                </div>
                <div>
                    <label>Contacts:</label>
                    <input
                        type="text"
                        value={contacts}
                              onChange={(e) => setContacts(e.target.value)}/>
                </div>
                <div>
                    <label>Average Check:</label>
                    <input
                        type="text"
                        value={averageCheck}
                              onChange={(e) => setAverageCheck(e.target.value)}/>
                </div>
                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateRestaurantForm};