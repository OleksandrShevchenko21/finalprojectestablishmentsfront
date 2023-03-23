import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {reviewService} from "../../services";


const initialState = {
    reviews: [],
    reviewsByRestaurant: [],
    currentReview: null,
    loading: false,
    error: null,
    oneReview: null,
    newReview: null,
    currentRestaurantId: null,
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

const getAllReviewsByRestaurant = createAsyncThunk(
    'reviewSlice/getAllReviewsByRestaurant',
    async (restaurantId, {rejectWithValue}) => {
        try {
            const {data} = await reviewService.getAllReviewsByRestaurant(restaurantId);
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
            try {
                // const token = getState().auth.token;
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User is not authorized');
                }

                const {data} = await reviewService.saveNewReview(newReview,token);
                dispatch(getAllReviewsByRestaurant(newReview.restaurantId));
                return data;
            } catch (e) {
                return rejectWithValue(e.response.data)
            }
        }
    )
;

// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
const updateReview = createAsyncThunk(
    "reviewSlice/updateReview",
    async ({id, updatedReview}, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(updatedReview);

        try {

            const {data} = await reviewService.updateReview(id, updatedReview);
            dispatch(getAllReviewsByRestaurant(updatedReview.restaurantId));
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
        clearReviews: (state) => {

            state.reviews = [];

        },
        setCurrentRestaurantId: (state, action) => {
            state.currentRestaurantId = action.payload;
        },
        // getAllReviewsByRestaurantSuccess: (state, action) => {
        //     const {restaurantId, reviews} = action.payload;
        //     state.reviewsByRestaurant[restaurantId] = reviews;
        // },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
                // state.reviews = state.reviews.filter(rev)
            })
            .addCase(getAllReviewsByRestaurant.fulfilled, (state, action) => {

                state.reviews = action.payload
                state.reviewsByRestaurant = state.reviews.filter((review) => {
                    if (review.restaurantId === action.payload.restaurantId) {
                        return action.payload;
                    } else {
                        return null;
                    }
                })
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
    actions: {
        setCurrentReview,
        removeReviewSuccess,
        clearReviews,
        setCurrentRestaurantId
    }
} = reviewSlice

const reviewActions = {
    getAllReviews,
    getAllReviewsByRestaurant,
    setCurrentReview,
    getReviewByID,
    saveNewReview,
    deleteReviewByID,
    updateReview, clearReviews, setCurrentRestaurantId
}
export {
    reviewReducer,
    reviewActions
}