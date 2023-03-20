import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {newsService} from "../../services";
import {bookingService} from "../../services/bookingService";


const initialState = {
    bookings: [],

    loading: false,
    error: null,

    oneBooking: null,
}

const getAllBookings = createAsyncThunk(
    'bookingSlice/getAllBookings',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await bookingService.getAllBookings();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
const saveBooking = createAsyncThunk(
    'bookingSlice/saveBooking',
    async (newBooking, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await bookingService.saveBooking(newBooking);
            dispatch(getAllBookings());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
const updateBookingById = createAsyncThunk(
    "bookingSlice/updateBooking",
    async ({id, updatedBooking}, {rejectWithValue, dispatch}) => {

        try {

            const {data} = await bookingService.updateBookingById(id, updatedBooking);
            dispatch(getAllBookings());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
const deleteBookingById = createAsyncThunk(
    'bookingSlice/deleteGeneralNewsById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await bookingService.deleteBookingById(id);
            dispatch(removeBookingSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {
        removeBookingSuccess: (state, action) => {
            state.bookings = state.bookings.filter((r) => r.id !== action.payload);
        },
        removeBookingError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.bookings = action.payload
            })

            .addCase(deleteBookingById.fulfilled, (state, action) => {
            })

            .addCase(saveBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings.push(action.payload);
            })

            .addCase(updateBookingById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oneBooking = action.payload
                state.bokings = state.bookings.map((booking) => {
                    if (booking.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return booking;
                    }
                })
            })
});
const {
    reducer: bookingReducer,
    actions: {
        removeBookingSuccess,
    }
} = bookingSlice

const bookingActions = {
    getAllBookings,
    saveBooking,
    updateBookingById,
    deleteBookingById,
}
export {
    bookingReducer,
    bookingActions
}