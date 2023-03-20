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

    return (
        <div className="promotionNewsItem-info-container">
            <div>
                <div>id: {id}</div>
                <div>PromotionNewsText: {promotionNews}</div>
            </div>
            <div className="promotionNewsItem-button-container">

                <button
                    onClick={() => dispatch(newsActions.deletePromotionNewsById({id}))}>delete
                </button>
                <button onClick={() => onEdit(promotionNewsItem)}>Edit</button>
            </div>
        </div>
    );
};
export {PromotionNewsItem};