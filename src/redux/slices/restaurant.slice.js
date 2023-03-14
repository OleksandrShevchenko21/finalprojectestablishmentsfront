import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {restaurantService} from "../../services";

const initialState = {
    restaurants: [],
    currentRestaurant: null,
    loading: false,
    error: null,
    oneRestaurant: null,
    newRestaurant: null,
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

// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
const updateRestaurant = createAsyncThunk(
    "restaurantSlice/updateRestaurant",
    async ({id, updatedRestaurant}, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(updatedRestaurant);

        try {

            const {data} = await restaurantService.updateRestaurant(id, updatedRestaurant);
            dispatch(getAllRestaurants());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
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
                state.users.push(action.payload);
            })
            .addCase(updateRestaurant.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oneRestaurant = action.payload
                state.restaurants = state.restaurants.map((restaurant) => {
                    if (restaurant.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return restaurant;
                    }

                })

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
    deleteRestaurantByID,
    updateRestaurant
}
export {
    restaurantReducer,
    restaurantActions
}