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
    const token = localStorage.getItem('token');
    const deleteButton = () => {
        if (token) {
            return (
                <button
                    onClick={() => dispatch(newsActions.deleteEventNewsById({id}))}>delete
                </button>
            )
        }
        return null;
    }
    const editButton = () => {
        if (token) {
            return (
                <button onClick={() => onEdit(eventNewsItem)}>Edit</button>
            )
        }
        return null;
    }

    return (
        <div className="news-info-container">
            <div>
                <div>id: {id}</div>
                <div className="news-text">
                    {eventNews}
                </div>
                <hr/>
            </div>
            <div className="eventNewsItem-button-container">
                {deleteButton()}
                {editButton()}
            </div>
        </div>
    );
};
export {EventNewsItem};