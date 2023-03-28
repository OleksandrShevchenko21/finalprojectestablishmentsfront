import {useDispatch} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./GeneralNewsItem.css"


const PromotionNewsItem = ({promotionNewsItem, onEdit}) => {
    const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        promotionNews
    } = promotionNewsItem
    const token = localStorage.getItem('token');
    const deleteButton = () => {
        if (token) {
            return (
                <button
                    onClick={() => dispatch(newsActions.deletePromotionNewsById({id}))}>delete
                </button>
            )
        }
        return null;
    }
    const editButton = () => {
        if (token) {
            return (
                <button onClick={() => onEdit(promotionNewsItem)}>Edit</button>
            )
        }
        return null;
    }

    return (
        <div className="news-info-container">
            <div>
                <div>id: {id}</div>
                <div className="news-text">
                    {promotionNews}
                </div>
                <hr/>
            </div>
            <div className="news-button-container">
                {deleteButton()}
                {editButton()}
            </div>
        </div>
    );
};
export {PromotionNewsItem};