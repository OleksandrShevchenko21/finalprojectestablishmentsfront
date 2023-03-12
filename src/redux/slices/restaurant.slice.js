import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {restaurantService} from "../../services";

const initialState = {
    restaurants: [],
    currentRestaurant: null,
    loading: false,
    error: null,
    oneRestaurant: null,
    newRestaurant: null
}

const getAllRestaurants = createAsyncThunk(
    'restaurantSlice/getAllRestaurants',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getAllRestaurants();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getRestaurantByID = createAsyncThunk(
    'restaurantSlice/getRestaurantById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantById(id);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
const saveNewRestaurant = createAsyncThunk(
    'restaurantSlice/saveNewRestaurant',
    async (newRestaurant, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(newRestaurant);
        try {
            const {data} = await restaurantService.saveNewRestaurant(newRestaurant);
            dispatch(getAllRestaurants());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
const deleteRestaurantByID = createAsyncThunk(
    'restaurantSlice/deleteRestaurantById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await restaurantService.deleteRestaurantById(id);
            dispatch(removeRestaurantSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const restaurantSlice = createSlice({
    name: 'restaurantSlice',
    initialState,
    reducers: {
        // getAllRestaurants: (state, action) => {
        //     state.restaurants = action.payload
        // },
        // setCurrentRestaurant: (state, action) => {
        //     state.currentRestaurant = action.payload
        // }
        // },
        // extraReducers: {
        //     [getAllRestaurants.fulfilled]: (state, action) => {
        //         state.restaurants = action.payload
        //     }
        removeRestaurantSuccess: (state, action) => {
            state.restaurants = state.restaurants.filter((r) => r.id !== action.payload);
        },
        removeRestaurantError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllRestaurants.fulfilled, (state, action) => {
                state.restaurants = action.payload
            })
            .addCase(getRestaurantByID.fulfilled, (state, action) => {
                state.oneRestaurant = action.payload
            })
            .addCase(deleteRestaurantByID.fulfilled, (state, action) => {
                // state.restaurants = state.restaurants.filter(
                //     (restaurant) => restaurant.id !== action.payload.id
                // );
            })
            .addCase(saveNewRestaurant.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.restaurants.push(action.payload);
            })
});
const {
    reducer: restaurantReducer,
    actions: {setCurrentRestaurant, removeRestaurantSuccess,}
} = restaurantSlice;

const restaurantActions = {
    getAllRestaurants,
    setCurrentRestaurant,
    getRestaurantByID,
    saveNewRestaurant,
    deleteRestaurantByID
}
export {
    restaurantReducer,
    restaurantActions
}