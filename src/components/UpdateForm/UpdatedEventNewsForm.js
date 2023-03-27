import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./UpdatedNewsForm.css"


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
            <div className="main-news-container">

                <div className="news-single-container">
                    <textarea
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