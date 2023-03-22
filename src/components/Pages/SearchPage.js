import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {restaurantActions} from "../../redux";
import "./SearchPage.css"


const SearchPage = () => {
    const dispatch = useDispatch();
    const [restaurantName, setRestaurantName] = useState("");

    useEffect(() => {
            dispatch(restaurantActions.getRestaurantsFindByName(restaurantName))
        }, [restaurantName]
    )

    return (
        <div className="searchBar">
            <input type="text"
                   value={restaurantName}
                   placeholder="Search Restaurant"
                   onChange={(e) => setRestaurantName(e.target.value)}/>
        </div>
    );
}
export {SearchPage};
