import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantService} from "../../services";
import {restaurantActions} from "../../redux";
import {Restaurant} from "../Restaurant/Restaurant";
import {create} from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import css from "../Header/Header.module.css";

const Restaurants = () => {

    const dispatch = useDispatch();
    const {
        restaurants,
    } = useSelector(state => state.restaurantReducer);

    useEffect(() => {
        dispatch(restaurantActions.getAllRestaurants())
    }, [])
    return (
        <div>

            <h4>Restaurants:</h4>
            {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID())}>add</button>*/}
            {/*{Array.isArray(restaurants) ? (restaurants.map(restaurant => <Restaurant key={restaurant.id}*/}
            {Array.isArray(restaurants) ? (restaurants.map(restaurant =>
                    <Restaurant key={restaurant.id}
                                restaurant={restaurant}/>)
            ) : (
                <p>No restaurants found</p>
            )}
        </div>
    );
};
export {Restaurants};