import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue
} from "@reduxjs/toolkit";
import {restaurantService, reviewService} from "../../services";

const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("User is not authorized");
    }
    return token;
};

const initialState = {
    restaurants: [],
    favorites: [],
    currentRestaurant: null,
    loading: false,
    error: null,
    oneRestaurant: null,
    newRestaurant: null,

    // reviewsByRestaurant: {}
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
// const getAllReviewsByRestaurant = createAsyncThunk(
//     'restaurantSlice/getAllReviewsByRestaurant',
//     async (id, {rejectWithValue}) => {
//         try {
//             const {data} = await reviewService.getAllReviewsByRestaurant(id);
//             return {id, data}
//         } catch (e) {
//             return rejectWithValue(e.response.data)
//         }
//
//     }
// );
const getRestaurantByID = createAsyncThunk(
    'restaurantSlice/getRestaurantById',
    async (id, {rejectWithValue}) => {
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
        try {
            const token = getToken();
            const {data} = await restaurantService.saveNewRestaurant(newRestaurant,token);
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
        try {
            const token = getToken();
            const {data} = await restaurantService.updateRestaurant(id, updatedRestaurant,token);
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
            const token = getToken();
            await restaurantService.deleteRestaurantById(id,token);
            dispatch(removeRestaurantSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const getRestaurantsByRatingAsc = createAsyncThunk(
    'restaurantSlice/getRestaurantsByRatingAsc',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByRatingAsc();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getRestaurantsByRatingDesc = createAsyncThunk(
    'restaurantSlice/getRestaurantsByRatingDesc',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByRatingDesc();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getRestaurantsByNameAsc = createAsyncThunk(
    'restaurantSlice/getRestaurantsByNameAsc',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByNameAsc();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getRestaurantsByNameDesc = createAsyncThunk(
    'restaurantSlice/getRestaurantsByNameDesc',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByNameDesc();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const getRestaurantsByRatingGreaterThanEqual = createAsyncThunk(
    'restaurantSlice/getRestaurantsByRatingGreaterThanEqual',
    async (minRating, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByRatingGreaterThanEqual(minRating);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const getRestaurantsByType = createAsyncThunk(
    'restaurantSlice/getRestaurantsByType',
    async (type, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByType(type);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const getRestaurantsByAverageCheck = createAsyncThunk(
    'restaurantSlice/getRestaurantsByAverageCheck',
    async ({minCheck, maxCheck}, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByAverageCheck(minCheck, maxCheck);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getRestaurantsByPublishDateAsc = createAsyncThunk(
    'restaurantSlice/getRestaurantsByPublishDateAsc',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByPublishDateAsc();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getRestaurantsByPublishDateDesc = createAsyncThunk(
    'restaurantSlice/getRestaurantsByPublishDateDesc',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsByPublishDateDesc();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const getRestaurantsFindByName = createAsyncThunk(
    'restaurantSlice/getRestaurantsFindByName',
    async (restaurantName, {rejectWithValue}) => {
        try {
            const {data} = await restaurantService.getRestaurantsFindByName(restaurantName);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
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

                })
                .addCase(saveNewRestaurant.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.restaurants.push(action.payload);
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
                .addCase(getRestaurantsByRatingAsc.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                .addCase(getRestaurantsByRatingDesc.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })

                .addCase(getRestaurantsByNameAsc.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })

                .addCase(getRestaurantsByNameDesc.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                .addCase(getRestaurantsByRatingGreaterThanEqual.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                .addCase(getRestaurantsByType.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                .addCase(getRestaurantsByAverageCheck.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                .addCase(getRestaurantsByPublishDateAsc.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                .addCase(getRestaurantsByPublishDateDesc.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })

                .addCase(getRestaurantsFindByName.fulfilled, (state, action) => {
                    state.restaurants = action.payload
                })
                // .addCase(getFavoritesByUserName.fulfilled, (state, action) => {
                //     state.restaurants = action.payload
                // })
                // .addCase(addRestaurantToFavorites.fulfilled, (state, action) => {
                //     // state.restaurants.push(action.payload);
                //     state.oneRestaurant = action.payload
                //     state.restaurants = state.restaurants.map((restaurant) => {
                //         if (restaurant.id === action.payload.id) {
                //             return action.payload;
                //         } else {
                //             return restaurant;
                //         }
                //
                //     })
                // })
    })
;
const {
    reducer: restaurantReducer,
    actions: {setCurrentRestaurant, removeRestaurantSuccess,}
} = restaurantSlice;

const restaurantActions = {
    getAllRestaurants,
    // getAllReviewsByRestaurant,
    setCurrentRestaurant,
    getRestaurantByID,
    saveNewRestaurant,
    deleteRestaurantByID,
    updateRestaurant,

    getRestaurantsByRatingAsc,
    getRestaurantsByRatingDesc,
    getRestaurantsByNameAsc,
    getRestaurantsByNameDesc,
    getRestaurantsByRatingGreaterThanEqual,
    getRestaurantsByType,
    getRestaurantsByAverageCheck,
    getRestaurantsByPublishDateAsc,
    getRestaurantsByPublishDateDesc,
    getRestaurantsFindByName,
    // getFavoritesByUserName,
    // addRestaurantToFavorites
}
export {
    restaurantReducer,
    restaurantActions
}