import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import './NewGeneralNewsForm.css'
import {newsActions} from "../../redux/slices/news.slices";

const NewPromotionNewsForm = ({restaurant, onSubmit}) => {
    console.log(restaurant);
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.newsReducer);
    const [promotionNews, setPromotionNews] = useState('');

    const handleSubmit = (e) => {
        const newPromotionNews = {
            promotionNews,
            restaurantId:restaurant.id
        };
        e.preventDefault();


        dispatch(newsActions.saveNewPromotionNews(newPromotionNews))
        console.log(newPromotionNews);

        setPromotionNews('');
        onSubmit && onSubmit();

    };
    // setRestaurantId(restaurant.id)
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="singleForm-container">
                    <label>Promotion text:</label>
                    <input
                        type="text"
                        value={promotionNews}
                        onChange={(e) => setPromotionNews(e.target.value)}
                    />
                </div>


                <button type="submit">Add Promotion News</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewPromotionNewsForm};