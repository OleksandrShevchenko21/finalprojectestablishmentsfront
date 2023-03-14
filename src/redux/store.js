import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices";
import {userReducer} from "./slices/user.slice";

const rootReducer = combineReducers({
    restaurantReducer,userReducer
})
const setupStore = () => configureStore({
    reducer: rootReducer
});
export{
    setupStore
}
