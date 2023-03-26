import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {favoritesService, restaurantService} from "../../services";


const initialState = {
    favorites: [],
    loading: false,
    error: null,
    oneFavorite: null,
}
const addRestaurantToFavorites = createAsyncThunk(
    'favoriteSlice/addRestaurantToFavorites',
    async ({id, userName, restaurant}, {rejectWithValue,dispatch}) => {
        try {
            const {data} = await favoritesService.addRestaurantToFavorites(id, userName, restaurant);
            dispatch(favoritesByUserName(userName));
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const favoritesByUserName = createAsyncThunk(
    'favoritesSlice/getFavoritesByUserName',
    async (userName, {rejectWithValue}) => {
        try {
            const {data} = await favoritesService.getFavoritesByUserName({userName});
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const deleteFavoritesByUserName = createAsyncThunk(
    'favoritesSlice/deleteFavoritesByUserName',
    async ({id, userName}, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await favoritesService.deleteFavoritesByUserName(id,userName);
            dispatch(removeFavoritesSuccess(id,userName));
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const favoritesSlice = createSlice({
    name: 'favoritesSlice',
    initialState,
    reducers: {
        removeFavoritesSuccess: (state, action) => {
            state.favorites = state.favorites.filter((r) => r.id !== action.payload);
        },
        removeFavoritesError: (state, action) => {
            state.error = action.payload;
        },

    },
    extraReducers: (builder) =>
        builder
            .addCase(favoritesByUserName.fulfilled, (state, action) => {
                state.favorites = action.payload
                // state.favorites = state.favorites.filter((favorite) => {
                //     if (favorite.username === action.payload.userName) {
                //         return action.payload;
                //     } else {
                //         return null;
                //     }
                // })
            })
            .addCase(deleteFavoritesByUserName.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload.id);
            })
            .addCase(addRestaurantToFavorites.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
            })
});
const {
    reducer: favoritesReducer,
    actions: {removeFavoritesSuccess}
} = favoritesSlice

const favoritesActions = {
    addRestaurantToFavorites,
    favoritesByUserName,
    deleteFavoritesByUserName
}
export {
    favoritesReducer,
    favoritesActions
}