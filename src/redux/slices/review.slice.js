import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {reviewService} from "../../services";




const initialState = {
    reviews: [],
    currentReview: null,
    loading: false,
    error: null,
    oneReview: null,
    newReview: null,
}

const getAllReviews = createAsyncThunk(
    'reviewSlice/getAllReviews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await reviewService.getAllReviews();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getReviewByID = createAsyncThunk(
    'reviewSlice/getReviewById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await reviewService.getReviewById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
const saveNewReview = createAsyncThunk(
    'reviewSlice/saveNewReview',
    async (newReview, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(newReview);
        try {
            const {data} = await reviewService.saveNewReview(newReview);
            dispatch(getAllReviews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
const updateReview = createAsyncThunk(
    "reviewSlice/updateReview",
    async ({id, updatedReview}, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(updatedReview);

        try {

            const {data} = await reviewService.updateReview(id, updatedReview);
            dispatch(getAllReviews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
const deleteReviewByID = createAsyncThunk(
    'reviewSlice/deleteReviewById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await reviewService.deleteReviewById(id);
            dispatch(removeReviewSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {
        removeReviewSuccess: (state, action) => {
            state.reviews = state.reviews.filter((r) => r.id !== action.payload);
        },
        removeReviewError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
            })
            .addCase(getReviewByID.fulfilled, (state, action) => {
                state.oneReview = action.payload
            })
            .addCase(deleteReviewByID.fulfilled, (state, action) => {
                // state.Reviews = state.Reviews.filter(
                //     (Review) => Review.id !== action.payload.id
                // );
            })
            .addCase(saveNewReview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews.push(action.payload);
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oneReview = action.payload
                state.reviews = state.reviews.map((review) => {
                    if (review.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return review;
                    }

                })

            })


});
const {
    reducer: reviewReducer,
    actions: {setCurrentReview, removeReviewSuccess,}
} = reviewSlice

const reviewActions = {
    getAllReviews,
    setCurrentReview,
    getReviewByID,
    saveNewReview,
    deleteReviewByID,
    updateReview
}
export {
    reviewReducer,
    reviewActions
}