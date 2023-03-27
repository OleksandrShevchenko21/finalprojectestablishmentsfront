import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./UpdatedNewsForm.css"


const UpdateGeneralNewsForm = ({generalNewsItem, onUpdate, onClose, resetForm}) => {

    console.log(generalNewsItem);

    const {status, error}
        = useSelector((state) => state.newsReducer);
    const [id, setId] = useState(generalNewsItem.id);
    const [generalNews, setGeneralNews] = useState(generalNewsItem.generalNews);


    useEffect(() => {
        setId(generalNewsItem.id);
        setGeneralNews(generalNewsItem.generalNews);

    }, [generalNewsItem]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedGeneralNews = {
            // id,
            generalNews
        };

        dispatch(newsActions.updateGeneralNews({id, updatedGeneralNews}));
        onUpdate(id, updatedGeneralNews);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="main-news-container">

                <div className="news-single-container">
                    <textarea
                        value={generalNews}
                        onChange={(e) => setGeneralNews(e.target.value)}
                    />
                </div>

                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateGeneralNewsForm};