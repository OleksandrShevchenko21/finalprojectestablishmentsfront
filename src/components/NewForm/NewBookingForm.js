import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import './NewBookingForm.css'
import {bookingActions} from "../../redux/slices/booking.slice";
import jwt_decode from "jwt-decode";

const NewBookingForm = ({restaurant, onSubmit}) => {
    console.log(restaurant);
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.bookingReducer);
    const [reservationDateTime, setReservationDateTime] = useState('T');
    const [purpose, setPurpose] = useState('');
    const [gender, setGender] = useState('');
    const [numPeople, setNumPeople] = useState('');
    const [whoPays, setWhoPays] = useState('');
    const [desiredExpenses, setDesiredExpenses] = useState('');
    const [userName, setUserName] = useState(null);

    const handleReservationDateTimeChange = (e) => {
        setReservationDateTime(e.target.value);
    };

    const handleReservationDateTimeBlur = (e) => {
        const dateTime = e.target.value;
        if (dateTime) {
            const [date, time] = dateTime.split(" ");
            setReservationDateTime(`${dateTime}`);
        }
    };

    const handleSubmit = (e) => {
        const newBooking = {
            reservationDateTime,
            purpose,
            gender,
            numPeople,
            whoPays,
            desiredExpenses,
            restaurantId: restaurant.id,
            userName: userName
        };
        e.preventDefault();

        dispatch(bookingActions.saveBooking(newBooking))
        console.log(newBooking);


        setReservationDateTime('');
        setPurpose('');
        setGender('');
        setNumPeople('');
        setWhoPays('');
        setDesiredExpenses('');
        onSubmit && onSubmit();
    };
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const tokenUserName = decodedToken.sub;

            setUserName(tokenUserName);
        }
    }, []);
    console.log("userName: " + userName);
    // console.log(token);
    // setRestaurantId(restaurant.id)
    return (
        <form onSubmit={handleSubmit}>
            <div className="main-booking-form-container">
                <div className="second-booking-form-container">
                    <div className="singleForm-container">
                        <label>Reservation Date Time:</label>
                        <input
                            type="datetime-local"
                            value={reservationDateTime}
                            onChange={handleReservationDateTimeChange}
                            onBlur={handleReservationDateTimeBlur}
                        />
                    </div>

                    <div className="singleForm-container">
                        <label>Purpose:</label>
                        <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                    </div>

                    <div className="singleForm-container">
                        <label>Gender:</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                </div>
                <div className="second-booking-form-container">
                    <div className="singleForm-container">
                        <label>Number of people:</label>
                        <input
                            type="number"
                            value={numPeople}
                            onChange={(e) => setNumPeople(e.target.value)}
                        />
                    </div>

                    <div className="singleForm-container">
                        <label>Who will pay:</label>
                        <input
                            type="text"
                            value={whoPays}
                            onChange={(e) => setWhoPays(e.target.value)}
                        />
                    </div>

                    <div className="singleForm-container">
                        <label>Desired expenses:</label>
                        <input
                            type="number"
                            value={desiredExpenses}
                            onChange={(e) => setDesiredExpenses(e.target.value)}
                        />
                    </div>
                </div>


                <button type="submit">Add Booking</button>


                {/*{status === "loading" && <p>Loading...</p>}*/
                }
                {/*{status === "error" && <p>{error}</p>}*/
                }

            </div>
        </form>
    )
        ;
}
export {NewBookingForm};