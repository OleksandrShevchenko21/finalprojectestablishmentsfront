import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices";
import {userReducer} from "./slices/user.slice";
import {reviewReducer} from "./slices/review.slice";
import {newsReducer} from "./slices/news.slices";

const rootReducer = combineReducers({
    restaurantReducer,userReducer,reviewReducer,newsReducer
})
const setupStore = () => configureStore({
    reducer: rootReducer
});
export{
    setupStore
}
