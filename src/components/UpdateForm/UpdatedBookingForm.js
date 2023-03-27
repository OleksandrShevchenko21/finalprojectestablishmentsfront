import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bookingActions} from "../../redux/slices/booking.slice";




const UpdateBookingForm = ({booking, onUpdate, onClose, resetForm}) => {

    console.log(booking);

    const {status, error}
        = useSelector((state) => state.bookingReducer);

    const [id, setId] = useState(booking.id);
    const [reservationDateTime, setReservationDateTime] = useState(booking.reservationDateTime);
    const [purpose, setPurpose] = useState(booking.purpose);
    const [gender, setGender] = useState(booking.gender);
    const [numPeople, setNumPeople] = useState(booking.numPeople);
    const [whoPays, setWhoPays] = useState(booking.whoPays);
    const [desiredExpenses, setDesiredExpenses] = useState(booking.desiredExpenses);


    useEffect(() => {
        setId(booking.id);
        setReservationDateTime(booking.reservationDateTime);
        setPurpose(booking.purpose);
        setGender(booking.gender);
        setNumPeople(booking.numPeople);
        setWhoPays(booking.whoPays);
        setDesiredExpenses(booking.desiredExpenses);

    }, [booking]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBooking = {
            // id,
            reservationDateTime,
            purpose,
            gender,
            numPeople,
            whoPays,
            desiredExpenses
        };

        dispatch(bookingActions.updateBookingById({id, updatedBooking}));
        onUpdate(id, updatedBooking);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="booking-form-container">
                <div className="singleForm-container">
                    <label>Review ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="booking-singleForm-container">
                    <label>Purpose:</label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                    />
                </div>

                <div className="booking-singleForm-container">
                    <label>Gender:</label>
                    <input
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>

                <div className="booking-singleForm-container">
                    <label>Reservation Date Time:</label>
                    <input
                        type="text"
                        value={reservationDateTime}
                        onChange={(e) => setReservationDateTime(e.target.value)}
                    />
                </div>

                <div className="booking-singleForm-container">
                    <label>Number of people:</label>
                    <input
                        type="number"
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                    />
                </div>

                <div className="booking-singleForm-container">
                    <label>Who will pay:</label>
                    <input
                        type="text"
                        value={whoPays}
                        onChange={(e) => setWhoPays(e.target.value)}
                    />
                </div>

                <div className="booking-singleForm-container">
                    <label>Desired expenses:</label>
                    <input
                        type="number"
                        value={desiredExpenses}
                        onChange={(e) => setDesiredExpenses(e.target.value)}
                    />
                </div>

                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateBookingForm};