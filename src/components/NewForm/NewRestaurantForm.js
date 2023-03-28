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
            <div className="main-container">
                <div className="restaurant-form-single-container">

                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>
                <div className="restaurant-form-single-container">

                    <select id="type-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}>
                        <option value="">Select a type</option>
                        <option value="BAR">Bar</option>
                        <option value="Restaurant">Restaurant</option>
                    </select>
                </div>
                <div className="restaurant-form-single-container">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                    />
                </div>
                <div className="restaurant-form-single-container">
                    <input
                        type="text"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        placeholder="Enter schedule"
                    />

                </div>
                <div className="restaurant-form-single-container">
                    <input
                        type="text"
                        value={contacts}
                        onChange={(e) => setContacts(e.target.value)}
                        placeholder="Enter contacts"
                    />
                </div>
                <div className="restaurant-form-single-container">
                    <input
                        type="text"
                        value={averageCheck}
                        onChange={(e) => setAverageCheck(e.target.value)}
                        placeholder="Enter avr. check"
                    />
                </div>
                <button type="submit">save</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewRestaurantForm};