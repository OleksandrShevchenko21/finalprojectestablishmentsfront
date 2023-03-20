import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {newsService} from "../../services";


const initialState = {
    generalNews: [],
    // promotionNews: [],
    // eventNews: [],

    loading: false,
    error: null,

    oneGeneralNews: null,
    // onePromotionNews: null,
    // oneEventNews: null,
}

const getAllGeneralNews = createAsyncThunk(
    'newsSlice/getAllGeneralNews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await newsService.getAllGeneralNews();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getAllPromotionNews = createAsyncThunk(
    'newsSlice/getAllPromotionNews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await newsService.getAllPromotionNews();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getAllEventNews = createAsyncThunk(
    'newsSlice/getAllEventNews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await newsService.getAllEventNews();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
const saveNewGeneralNews = createAsyncThunk(
    'newsSlice/saveNewGeneralNews',
    async (newGeneralNews, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await newsService.saveGeneralNews(newGeneralNews);
            dispatch(getAllGeneralNews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const saveNewPromotionNews = createAsyncThunk(
    'newsSlice/saveNewPromotionNews',
    async (newPromotionNews, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await newsService.savePromotionNews(newPromotionNews);
            dispatch(getAllPromotionNews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const saveNewEventNews = createAsyncThunk(
    'newsSlice/saveNewEventNews',
    async (newEventNews, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await newsService.saveEventNews(newEventNews);
            dispatch(getAllEventNews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
const updateGeneralNews = createAsyncThunk(
    "newsSlice/updateGeneralNews",
    async ({id, updatedGeneralNews}, {rejectWithValue, dispatch}) => {

        try {

            const {data} = await newsService.updateGeneralNewsById(id, updatedGeneralNews);
            dispatch(getAllGeneralNews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const updatePromotionNews = createAsyncThunk(
    "newsSlice/updatePromotionNews",
    async ({id, updatedPromotionNews}, {rejectWithValue, dispatch}) => {

        try {

            const {data} = await newsService.updatePromotionNewsById(id, updatedPromotionNews);
            dispatch(getAllPromotionNews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const updateEventNews = createAsyncThunk(
    "newsSlice/updateEventNews",
    async ({id, updatedEventNews}, {rejectWithValue, dispatch}) => {

        try {

            const {data} = await newsService.updateEventNewsById(id, updatedEventNews);
            dispatch(getAllEventNews());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
const deleteGeneralNewsById = createAsyncThunk(
    'newsSlice/deleteGeneralNewsById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await newsService.deleteGeneralNewsById(id);
            dispatch(removeGeneralNewsSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const deletePromotionNewsById = createAsyncThunk(
    'newsSlice/deletePromotionNewsById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await newsService.deletePromotionNewsById(id);
            dispatch(removePromotionNewsSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
const deleteEventNewsById = createAsyncThunk(
    'newsSlice/deleteEventNewsById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await newsService.deleteEventNewsById(id);
            dispatch(removeEventNewsSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        removeGeneralNewsSuccess: (state, action) => {
            state.generalNews = state.generalNews.filter((r) => r.id !== action.payload);
        },
        removePromotionNewsSuccess: (state, action) => {
            state.promotionNews = state.promotionNews.filter((r) => r.id !== action.payload);
        },
        removeEventNewsSuccess: (state, action) => {
            state.eventNews = state.eventNews.filter((r) => r.id !== action.payload);
        },
        removeGeneralNewsError: (state, action) => {
            state.error = action.payload;
        },
        removePromotionNewsError: (state, action) => {
            state.error = action.payload;
        },
        removeEventNewsError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllGeneralNews.fulfilled, (state, action) => {
                state.generalNews = action.payload
            })
            .addCase(getAllPromotionNews.fulfilled, (state, action) => {
                state.promotionNews = action.payload
            })
            .addCase(getAllEventNews.fulfilled, (state, action) => {
                state.eventNews = action.payload
            })


            .addCase(deleteGeneralNewsById.fulfilled, (state, action) => {
            })
            .addCase(deletePromotionNewsById.fulfilled, (state, action) => {
            })
            .addCase(deleteEventNewsById.fulfilled, (state, action) => {
            })


            .addCase(saveNewGeneralNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.generalNews.push(action.payload);
            })
            .addCase(saveNewPromotionNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.promotionNews.push(action.payload);
            })
            .addCase(saveNewEventNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventNews.push(action.payload);
            })


            .addCase(updateGeneralNews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oneGeneralNews = action.payload
                state.generalNews = state.generalNews.map((generalNewsItem) => {
                    if (generalNewsItem.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return generalNewsItem;
                    }
                })
            })
            .addCase(updatePromotionNews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.onePromotionNews = action.payload
                state.promotionNews = state.promotionNews.map((promotionNewsItem) => {
                    if (promotionNewsItem.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return promotionNewsItem;
                    }
                })
            })
            .addCase(updateEventNews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oneEventNews = action.payload
                state.eventNews = state.eventNews.map((eventNewsItem) => {
                    if (eventNewsItem.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return eventNewsItem;
                    }
                })
            })


});
const {
    reducer: newsReducer,
    actions: {
        removeGeneralNewsSuccess,
        removePromotionNewsSuccess,
        removeEventNewsSuccess,
    }
} = newsSlice

const newsActions = {
    getAllGeneralNews,
    getAllPromotionNews,
    getAllEventNews,

    saveNewGeneralNews,
    saveNewPromotionNews,
    saveNewEventNews,

    updateGeneralNews,
    updatePromotionNews,
    updateEventNews,

    deleteGeneralNewsById,
    deletePromotionNewsById,
    deleteEventNewsById
}
export {
    newsReducer,
    newsActions
}