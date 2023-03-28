import {useDispatch} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./GeneralNewsItem.css"
import {restaurantActions} from "../../redux";


const GeneralNewsItem = ({generalNewsItem, onEdit}) => {
    const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        generalNews
    } = generalNewsItem
    const token = localStorage.getItem('token');
    const deleteButton = () => {
        if (token) {
            return (
                <button
                    onClick={() => dispatch(newsActions.deleteGeneralNewsById({id}))}>delete
                </button>
            )
        }
        return null;
    }
    const editButton = () => {
        if (token) {
            return (
                <button onClick={() => onEdit(generalNewsItem)}>Edit</button>
            )
        }
        return null;
    }

    return (
        <div className="news-info-container">
            <div>
                <div>id: {id}</div>
                <div className="news-text">
                    {generalNews}
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
export {GeneralNewsItem};