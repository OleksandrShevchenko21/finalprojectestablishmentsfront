import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import './NewGeneralNewsForm.css'
import {newsActions} from "../../redux/slices/news.slices";

const NewGeneralNewsForm = ({restaurant, onSubmit}) => {
    console.log(restaurant);
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.newsReducer);
    const [generalNews, setGeneralNews] = useState('');

    const handleSubmit = (e) => {
        const newGeneralNews = {
            generalNews,
            restaurantId: restaurant.id
        };
        e.preventDefault();


        dispatch(newsActions.saveNewGeneralNews(newGeneralNews))
        console.log(newGeneralNews);

        setGeneralNews('');
        onSubmit && onSubmit();

    };
    // setRestaurantId(restaurant.id)
    return (
        <form onSubmit={handleSubmit}>
            <div className="news-form-container">
                <div className="news-singleForm-container">

                    <textarea
                        type="text"
                        value={generalNews}
                        onChange={(e) => setGeneralNews(e.target.value)}
                        placeholder="new general news"
                    />
                </div>

                <div>
                    <button type="submit">Add General News</button>
                </div>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewGeneralNewsForm};