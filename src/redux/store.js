import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {restaurantReducer} from "./slices";

const rootReducer = combineReducers({
    restaurantReducer
})
const setupStore = () => configureStore({
    reducer: rootReducer
});
export{
    setupStore
}
