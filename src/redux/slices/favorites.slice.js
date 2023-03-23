import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {favoritesService} from "../../services";


const initialState = {
    favorites: [],
    loading: false,
    error: null,
    oneFavorite: null,
}

const favoritesByUserName = createAsyncThunk(
    'favoritesSlice/getFavoritesByUserName',
    async (userName, {rejectWithValue}) => {
        try {
            const {data} = await favoritesService.getFavoritesByUserName(userName);
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
            })
});
const {
    reducer: favoritesReducer,
    actions: { removeFavoritesSuccess,}
} = favoritesSlice;

const favoritesActions = {
    favoritesByUserName,
}
export {
    favoritesReducer,
    favoritesActions
}