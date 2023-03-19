import {useDispatch} from "react-redux";
import {newsActions} from "../../redux/slices/news.slices";
import "./GeneralNewsItem.css"


const GeneralNewsItem = ({generalNewsItem, onEdit}) => {
    const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        generalNews
    } = generalNewsItem

    return (
        <div className="generalNewsItem-info-container">
            <div>
                <div>id: {id}</div>
                <div>generalNewsText: {generalNews}</div>
            </div>
            <div className="generalNewsItem-button-container">

                <button
                    onClick={() => dispatch(newsActions.deleteGeneralNewsById({id}))}>delete
                </button>
                <button onClick={() => onEdit(generalNewsItem)}>Edit</button>
            </div>
        </div>
    );
};
export {GeneralNewsItem};