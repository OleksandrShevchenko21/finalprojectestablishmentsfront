import {useDispatch} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./GeneralNewsItem.css"


const EventNewsItem = ({eventNewsItem, onEdit}) => {
    const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        eventNews
    } = eventNewsItem

    return (
        <div className="eventNewsItem-info-container">
            <div>
                <div>id: {id}</div>
                <div>EventNewsText: {eventNews}</div>
            </div>
            <div className="eventNewsItem-button-container">

                <button
                    onClick={() => dispatch(newsActions.deleteEventNewsById({id}))}>delete
                </button>
                <button onClick={() => onEdit(eventNewsItem)}>Edit</button>
            </div>
        </div>
    );
};
export {EventNewsItem};