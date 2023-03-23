import {useDispatch} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./Booking.css"
import {bookingActions} from "../../redux/slices/booking.slice";


const Booking = ({booking, onEdit}) => {
    const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        reservationDateTime,
        purpose,
        gender,
        numPeople,
        whoPays,
        desiredExpenses,
        restaurantId,
        userName
    } = booking

    return (
        <div className="booking-info-container">
            <div>
                <div>id: {id}</div>
                <div>reservationDateTime: {reservationDateTime}</div>
                <div>purpose: {purpose}</div>
                <div>gender: {gender}</div>
                <div>num of people: {numPeople}</div>
                <div>who will pay: {whoPays}</div>
                <div>desired expenses: {desiredExpenses}</div>
                <div>name: {userName}</div>
            </div>
            <div className="booking-button-container">

                <button
                    onClick={() => dispatch(bookingActions.deleteBookingById({id}))}>delete
                </button>
                <button onClick={() => onEdit(booking)}>Edit</button>
            </div>
        </div>
    );
};
export {Booking};