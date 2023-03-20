import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reviewActions} from "../../redux/slices/review.slice";
import {newsActions} from "../../redux/slices/news.slices";


const UpdateEventNewsForm = ({eventNewsItem, onUpdate, onClose, resetForm}) => {

    console.log(eventNewsItem);

    const {status, error}
        = useSelector((state) => state.newsReducer);
    const [id, setId] = useState(eventNewsItem.id);
    const [eventNews, setEventNews] = useState(eventNewsItem.eventNews);


    useEffect(() => {
        setId(eventNewsItem.id);
        setEventNews(eventNewsItem.eventNews);

    }, [eventNewsItem]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEventNews = {
            // id,
            eventNews
        };

        dispatch(newsActions.updateEventNews({id, updatedEventNews}));
        onUpdate(id, updatedEventNews);

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
                    <label>Event News:</label>
                    <input
                        type="text"
                        value={eventNews}
                        onChange={(e) => setEventNews(e.target.value)}
                    />
                </div>

                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateEventNewsForm};