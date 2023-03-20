import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import './NewGeneralNewsForm.css'
import {newsActions} from "../../redux/slices/news.slices";

const NewEventNewsForm = ({restaurant, onSubmit}) => {
    console.log(restaurant);
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.newsReducer);
    const [eventNews, setEventNews] = useState('');

    const handleSubmit = (e) => {
        const newEventNews = {
            eventNews,
            restaurantId:restaurant.id
        };
        e.preventDefault();


        dispatch(newsActions.saveNewEventNews(newEventNews))
        console.log(newEventNews);

        setEventNews('');
        onSubmit && onSubmit();

    };
    // setRestaurantId(restaurant.id)
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="singleForm-container">
                    <label>Event text:</label>
                    <input
                        type="text"
                        value={eventNews}
                        onChange={(e) => setEventNews(e.target.value)}
                    />
                </div>


                <button type="submit">Add Event News</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewEventNewsForm};