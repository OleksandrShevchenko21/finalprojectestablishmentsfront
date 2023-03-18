import css from './Header.module.css'
import {useSelector} from "react-redux";

const Header = () => {
    const {oneRestaurant} = useSelector(state => state.restaurantReducer);
    return (

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