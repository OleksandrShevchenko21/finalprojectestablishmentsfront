import {useDispatch} from "react-redux";
import {restaurantActions} from "../../redux";

const Restaurant = ({restaurant}) => {
    const dispatch = useDispatch();
    const {
        id,
        restaurantName,
        type,
        address,
        schedule,
        contacts,
        averageCheck
    } = restaurant
    return (
        <div>
            <div>id: {id}</div>
            <div>name: {restaurantName}</div>
            <div>type: {type}</div>
            <div>address: {address}</div>
            <div>schedule: {schedule}</div>
            <div>contacts: {contacts}</div>
            <div>averageCheck: {averageCheck}</div>
            {/*<button onClick={()=>dispatch(restaurantActions.setCurrentRestaurant(restaurant))}>select</button>*/}
            <button onClick={()=>dispatch(restaurantActions.getRestaurantByID({id}))}>Select Restaurant</button>
            {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID({id}))}>add</button>*/}
            <button onClick={()=>dispatch(restaurantActions.deleteRestaurantByID({id}))}>delete</button>
        </div>
    );
};
export {Restaurant};