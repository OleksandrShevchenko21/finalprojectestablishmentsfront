import {useDispatch} from "react-redux";
import "./Favorite.css"
import {favoritesActions} from "../../redux/slices/favorites.slice";
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";

const Favorite = ({favorite}) => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const {
        id,
        restaurantName,
        type,
        address,
        schedule,
        contacts,
        averageCheck,
        dateOfPublish,
        averageRating,

    } = favorite
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const tokenUserName = decodedToken.sub;
            console.log(tokenUserName);
            setUserName(tokenUserName)
            console.log(userName);
        }

    }, [])

    const handleDeleteFavoritesButton = async () => {
        await dispatch(favoritesActions.deleteFavoritesByUserName({id, userName}))
    }


    return (
        <div className="favorite-main-container">

            <div className="favorite-10-container">
                <h6> name: {restaurantName}<br/>
                    Type: {type}<br/>
                    Address: {address}<br/>
                    {/*Schedule: {schedule}<br/>*/}
                    {/*Contacts: {contacts}<br/>*/}
                    {/*averageCheck: {averageCheck}<br/>*/}
                    {/*date of publish: {dateOfPublish}<br/>*/}
                    rating: {averageRating}
                    <hr/>
                </h6>


                <div className="favorite-button-container">
                    <button
                        onClick={handleDeleteFavoritesButton}>
                        delete
                    </button>
                </div>
            </div>

        </div>

    );
};
export {
    Favorite
};