import {Restaurants} from "../Restaurants/Restaurants";
import {FilterPage} from "./FilterPage";
import {NewRestaurantForm} from "../NewForm/NewRestaurantForm";
import './HomePage.css';
import {GeneralNews} from "../News/GeneralNews";
import {PromotionNews} from "../News/PromotionNews";
import {EventNews} from "../News/EventNews";
import {Bookings} from "../Bookings/Bookings";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Favorites} from "../Favorites/Favorites";

const HomePage = () => {
    const dispatch = useDispatch();
    const [userBookings, setUserBookings] = useState(false);
    const [userFavorites, setUserFavorites] = useState(false);
    const [isToken, setIsToken] = useState(false);
    const token = localStorage.getItem('token');


    const renderBookingsButton = () => {
        if (token) {
            return (
                <button onClick={() => {
                    setUserBookings(prevState => !prevState);
                }}>
                    {userBookings ? 'hide' : 'bookings'}
                </button>
            );
        }
        return null;
    };
    const renderFavoritesButton = () => {
        if (token) {
            return (
                <button onClick={() => {
                    setUserFavorites(prevState => !prevState);
                }}>
                    {userFavorites ? 'hide' : 'favorites'}
                </button>
            );
        }
        return null;
    };
    useEffect(() => {
        if (token) {
            setIsToken(true)
        }
    })

    return (

        <div className="main-container">

            <div className="first-container">

                <FilterPage/>
            </div>
            <div className="second-container">
                    {
                        isToken && (
                            <NewRestaurantForm/>
                        )
                    }
                <Restaurants/>

            </div>
            <div className="third-container">
                {renderBookingsButton()}
                {renderFavoritesButton()}


                {userBookings && <Bookings/>}
                {userFavorites && <Favorites/>}

                    <GeneralNews/>

                    <PromotionNews/>

                    <EventNews/>


            </div>
        </div>
    );
};
export {HomePage};