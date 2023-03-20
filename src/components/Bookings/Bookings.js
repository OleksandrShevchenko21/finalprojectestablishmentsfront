import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "./Bookings.css"
import {bookingActions} from "../../redux/slices/booking.slice";
import {Booking} from "../Booking/Booking";
import {UpdateBookingForm} from "../UpdateForm/UpdatedBookingForm";


const Bookings = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const {bookings} = useSelector((state) => state.bookingReducer);

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
    useEffect(() => {
        dispatch(bookingActions.getAllBookings())
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
            <div className="Bookings-container">

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