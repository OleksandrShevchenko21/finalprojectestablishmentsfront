import css from './Header.module.css'
import {useSelector} from "react-redux";

const Header = () => {
    const {oneRestaurant} = useSelector(state => state.restaurantReducer);
    return (
        // <div className={css.Header}>
        //     <div> {currentRestaurant && currentRestaurant.restaurantName}</div>
        //     <div>{currentRestaurant && currentRestaurant.type}</div>
        //     <div>{currentRestaurant && currentRestaurant.address}</div>
        //     <div>{currentRestaurant && currentRestaurant.schedule}</div>
        //     <div>{currentRestaurant && currentRestaurant.contacts}</div>
        //     <div>{currentRestaurant && currentRestaurant.averageCheck}</div>
        //
        // </div>

    <div className={css.Header}>
    <h4>Selected Restaurant:</h4>
        <div>{oneRestaurant && oneRestaurant.restaurantName}</div>
        <div>{oneRestaurant && oneRestaurant.type}</div>
        <div>{oneRestaurant && oneRestaurant.address}</div>
        <div>{oneRestaurant && oneRestaurant.schedule}</div>
        <div>{oneRestaurant && oneRestaurant.contacts}</div>
        <div>{oneRestaurant && oneRestaurant.averageCheck}</div>

    </div>
    );
};
export {Header};