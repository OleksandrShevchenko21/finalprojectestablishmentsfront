import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";
import {useEffect, useState} from "react";
import './NewRestaurantForm.css'

const NewRestaurantForm = () => {

    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.restaurantReducer);
    const [restaurantName, setRestaurantName] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [schedule, setSchedule] = useState('');
    const [contacts, setContacts] = useState('');
    const [averageCheck, setAverageCheck] = useState('');
    const handleSubmit = (e) => {
        const newRestaurant = {
            restaurantName,
            type,
            address,
            schedule,
            contacts,
            averageCheck,
        };
        e.preventDefault();

        const jsonBody = JSON.stringify(newRestaurant);
        console.log(jsonBody);

        dispatch(restaurantActions.saveNewRestaurant(newRestaurant))
        // Reset form fields
        setRestaurantName('');
        setType('');
        setAddress('');
        setSchedule('');
        setContacts('');
        setAverageCheck('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="singleForm-container">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Type:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Schedule:</label>
                    <input
                        type="text"
                        value={schedule}
                              onChange={(e) => setSchedule(e.target.value)}/>
                </div>
                <div className="singleForm-container">
                    <label>Contacts:</label>
                    <input
                        type="text"
                        value={contacts}
                              onChange={(e) => setContacts(e.target.value)}/>
                </div>
                <div className="singleForm-container">
                    <label>Average Check:</label>
                    <input
                        type="text"
                        value={averageCheck}
                              onChange={(e) => setAverageCheck(e.target.value)}/>
                </div>
                <button type="submit">Add Restaurant</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewRestaurantForm};