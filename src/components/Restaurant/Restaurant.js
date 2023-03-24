import {useDispatch, useSelector} from "react-redux";
import {restaurantActions} from "../../redux";
import {UpdateRestaurantForm} from "../UpdateForm/UpdatedRestaurantForm";
import {useEffect, useState} from "react";
import {Restaurants} from "../Restaurants/Restaurants";
import "./Restaurant.css"
import {Reviews} from "../Reviews/Reviews";
import {reviewActions} from "../../redux/slices/review.slice";
import {NewReviewForm} from "../NewForm/NewReviewForm";
import {NewGeneralNewsForm} from "../NewForm/NewGeneralNewsForm";
import {NewPromotionNewsForm} from "../NewForm/NewPromotionNewsForm";
import {NewEventNewsForm} from "../NewForm/NewEventNewsForm";
import {NewBookingForm} from "../NewForm/NewBookingForm";
import jwt_decode from "jwt-decode";
import {bookingActions} from "../../redux/slices/booking.slice";
import {favoritesActions} from "../../redux/slices/favorites.slice";

const Restaurant = ({restaurant = {}, onEdit}) => {
    const dispatch = useDispatch();
    const [showAddReviewForm, setShowAddReviewForm] = useState(false);
    const [showAddGeneralNewsForm, setShowAddGeneralNewsForm] = useState(false);
    const [showAddPromotionNewsForm, setShowAddPromotionNewsForm] = useState(false);
    const [showAddEventNewsForm, setShowAddEventNewsForm] = useState(false);
    const [showAddBookingForm, setShowAddBookingForm] = useState(false);

    const [showAllReviews, setShowAllReviews] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
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

    } = restaurant
    const {reviews: data} = useSelector(state => state.reviewReducer)


    // const handleSelectRestaurant = () => {
    //     // setShowAllReviews(false);
    //     dispatch(restaurantActions.getRestaurantByID(id));
    //     setSelectedRestaurant(restaurant);
    // };

    const handleGetReview = async () => {
        await dispatch(reviewActions.getAllReviewsByRestaurant(restaurant.id));
    };
    const handleAddReview = async () => {
        setShowAddReviewForm(false);
    };
    const handleAddGeneralNews = async () => {
        setShowAddGeneralNewsForm(false);
    };
    const handleAddPromotionNews = async () => {
        setShowAddPromotionNewsForm(false);
    };
    const handleAddEventNews = async () => {
        setShowAddEventNewsForm(false);
    };
    const handleAddBooking = async () => {
        setShowAddBookingForm(false);
    };

    const handleAddToFavorites = async () => {
       await dispatch(favoritesActions.addRestaurantToFavorites({id, userName,restaurant}))
        }

const token = localStorage.getItem('token');
useEffect(() => {
    if (token){
        const decodedToken = jwt_decode(token);
        const tokenUserName = decodedToken.sub;
        setUserName(tokenUserName)
    }
}, [])

    return (
        <div className="super-main">
            <div className="restaurant-main-container">

                <div className="image-button-container">
                    <div className="restaurant-image-container">
                        <div>image space</div>
                    </div>
                </div>


                {/*<div className="info-button">*/}

                <div className="restaurant-info-container">

                    <div className="restaurant-10-container">
                        <h3> {id}.</h3>
                        <h3> {restaurantName}</h3>
                    </div>
                    <div className="restaurant-20-container">
                        <div>Type: {type}</div>
                        <div>Address: {address}</div>
                        <div>Schedule: {schedule}</div>
                        <div>Contacts: {contacts}</div>
                    </div>
                    <div className="restaurant-30-container">
                        <div>averageCheck: {averageCheck}</div>
                        <div>date of publish: {dateOfPublish}</div>
                        <div>rating: {averageRating}</div>
                    </div>
                </div>

                <div className={"restaurant-button-container"}>
                    {/*<button onClick={handleSelectRestaurant}>Select Restaurant*/}
                    {/*</button>*/}

                    <button
                        onClick={() => dispatch(restaurantActions.deleteRestaurantByID({id}))}>delete
                    </button>
                    <button onClick={() => onEdit(restaurant)}>Edit</button>
                    {/*<button onClick={() => getReviews(restaurant)}>see all reviews</button>*/}

                    <button onClick={() => {
                        setShowAllReviews(prevState => !prevState);
                        handleGetReview(restaurant);
                    }}>
                        {showAllReviews ? 'hide' : 'see reviews'}
                    </button>

                    <button
                        onClick={() => setShowAddReviewForm(prevState => !prevState)}>
                        {showAddReviewForm ? 'Cancel' : 'Add Review'}
                    </button>

                    <button
                        onClick={() => setShowAddGeneralNewsForm(prevState => !prevState)}>
                        {showAddGeneralNewsForm ? 'Cancel' : 'Add General news'}
                    </button>

                    <button
                        onClick={() => setShowAddPromotionNewsForm(prevState => !prevState)}>
                        {showAddPromotionNewsForm ? 'Cancel' : 'Add Promotion news'}
                    </button>

                    <button
                        onClick={() => setShowAddEventNewsForm(prevState => !prevState)}>
                        {showAddEventNewsForm ? 'Cancel' : 'Add Event news'}
                    </button>

                    <button
                        onClick={() => setShowAddBookingForm(prevState => !prevState)}>
                        {showAddBookingForm ? 'Cancel' : 'Add Booking'}
                    </button>
                    <button
                        onClick={handleAddToFavorites}>
                        toFavorites
                    </button>
                </div>
                {/*</div>*/}
            </div>
            <div>

                {
                    showAllReviews && <Reviews restaurant={restaurant}/>
                }

                {
                    showAddReviewForm && (
                        <NewReviewForm restaurant={restaurant}
                                       onSubmit={handleAddReview}/>

                    )
                }
                {
                    showAddGeneralNewsForm && (
                        <NewGeneralNewsForm restaurant={restaurant}
                                            onSubmit={handleAddGeneralNews}/>
                    )
                }

                {
                    showAddPromotionNewsForm && (
                        <NewPromotionNewsForm restaurant={restaurant}
                                              onSubmit={handleAddPromotionNews}/>
                    )
                }

                {
                    showAddEventNewsForm && (
                        <NewEventNewsForm restaurant={restaurant}
                                          onSubmit={handleAddEventNews}/>
                    )
                }

                {
                    showAddBookingForm && (
                        <NewBookingForm restaurant={restaurant}
                                        onSubmit={handleAddBooking}/>
                    )
                }

            </div>


        </div>
    );

};
export {Restaurant};
