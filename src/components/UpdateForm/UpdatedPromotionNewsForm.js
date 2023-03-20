import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reviewActions} from "../../redux/slices/review.slice";
import {newsActions} from "../../redux/slices/news.slices";


const UpdatePromotionNewsForm = ({promotionNewsItem, onUpdate, onClose, resetForm}) => {

    console.log(promotionNewsItem);

    const {status, error}
        = useSelector((state) => state.newsReducer);
    const [id, setId] = useState(promotionNewsItem.id);
    const [promotionNews, setPromotionNews] = useState(promotionNewsItem.promotionNews);


    useEffect(() => {
        setId(promotionNewsItem.id);
        setPromotionNews(promotionNewsItem.promotionNews);

    }, [promotionNewsItem]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPromotionNews = {
            // id,
            promotionNews
        };

        dispatch(newsActions.updatePromotionNews({id, updatedPromotionNews}));
        onUpdate(id, updatedPromotionNews);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div>
                    <label>Review ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        readOnly
                    />
                </div>
                <div>
                    <label>Promotion News:</label>
                    <input
                        type="text"
                        value={promotionNews}
                        onChange={(e) => setPromotionNews(e.target.value)}
                    />
                </div>

                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdatePromotionNewsForm};