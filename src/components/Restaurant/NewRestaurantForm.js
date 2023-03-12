import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";
import {useEffect, useState} from "react";
const NewRestaurantForm = () => {

    const dispatch = useDispatch();

    const { status, error } = useSelector(
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


        // console.log(dispatch(restaurantActions.saveNewRestaurant(newRestaurant)))
               dispatch(restaurantActions.saveNewRestaurant(newRestaurant))
        };
        useEffect(() => {
            dispatch(restaurantActions.getAllRestaurants())
        }, [status, dispatch])

        return (
            <form onSubmit={handleSubmit}>
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
                    <textarea value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                </div>
                <div>
                    <label>Contacts:</label>
                    <textarea value={contacts} onChange={(e) => setContacts(e.target.value)} />
                </div>
                <div>
                    <label>Average Check:</label>
                    <textarea value={averageCheck} onChange={(e) => setAverageCheck(e.target.value)} />
                </div>
                <button type="submit">Add Restaurant</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </form>
        );
    console.log("restaurantName:", restaurantName);
    console.log("type:", type);
    console.log("address:", address);
    console.log("schedule:", schedule);
    console.log("contacts:", contacts);
    console.log("averageCheck:", averageCheck);
    console.log("status:", status);
    console.log("error:", error);
}
export {NewRestaurantForm};