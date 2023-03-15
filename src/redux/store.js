import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices";
import {userReducer} from "./slices/user.slice";
import {reviewReducer} from "./slices/review.slice";

const rootReducer = combineReducers({
    restaurantReducer,userReducer,reviewReducer
})
const setupStore = () => configureStore({
    reducer: rootReducer
});
export{
    setupStore
}
