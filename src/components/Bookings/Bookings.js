import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "./Bookings.css"
import {bookingActions} from "../../redux/slices/booking.slice";
import {Booking} from "../Booking/Booking";
import {UpdateBookingForm} from "../UpdateForm/UpdatedBookingForm";
import jwt_decode from "jwt-decode";


const Bookings = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const {bookings} = useSelector((state) => state.bookingReducer);
    console.log(bookings);
    const initialFormValues = {

        id: "",
        reservationDateTime: "",
        purpose: "",
        gender: "",
        numPeople: "",
        whoPays: "",
        desiredExpenses: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedBooking(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
    };
    const handleUpdate = async (id, updatedBooking) => {
        await dispatch(bookingActions.updateBookingById({
            id,
            updatedBooking
        }));
        resetForm();
    };

    const handleEdit = (booking) => {

        // setFormValues(null);
        setShowUpdateForm(true);
        setSelectedBooking(booking);
        setFormValues(booking);
    };
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const tokenUserName = decodedToken.sub;
            dispatch(bookingActions.getAllBookingsByUserName(tokenUserName))
        }
    }, [])
    return (
        <div>
            {selectedBooking && (
                <UpdateBookingForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    booking={selectedBooking}
                    onUpdate={() => handleUpdate(selectedBooking.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <h4>Bookings:</h4>
            <div className="bookings-container">

                {Array.isArray(bookings) ? (bookings.map(booking =>
                        <Booking key={booking.id}
                                 booking={booking}
                                 onEdit={handleEdit}/>)
                ) : (
                    <p>No Bookings found</p>
                )}
            </div>
        </div>
    );
};

export {Bookings};