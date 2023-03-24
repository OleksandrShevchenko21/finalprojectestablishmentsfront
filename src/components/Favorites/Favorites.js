import {useDispatch, useSelector} from "react-redux";


import jwt_decode from "jwt-decode";
import {Favorite} from "../Favorite/Favorite";
import {favoritesActions} from "../../redux/slices/favorites.slice";
import "./Favorites.css"
import {useEffect, useState} from "react";


const Favorites = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const {favorites} = useSelector((state) => state.favoritesReducer);

    const initialFormValues = {

        id: "",
        restaurantName: "",
        type: "",
        address: "",
        schedule: "",
        contacts: "",
        averageCheck: "",
        dateOfPublish: ""
    };

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const tokenUserName = decodedToken.sub;
            console.log(tokenUserName);
            setUserName(tokenUserName)
            console.log(userName);
        }
            dispatch(favoritesActions.favoritesByUserName(userName))
    }, [userName])
    console.log(favorites);
    return (
        <div>
            <h4>Favorites:</h4>
            <div className="favorites-container">

                {Array.isArray(favorites) ? (favorites.map(favorite =>
                        <Favorite key={favorite.id}
                                  favorite={favorite}/>)
                ) : (
                    <p>no favorites</p>
                )}
            </div>
        </div>
    );
};

export {Favorites};