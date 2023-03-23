import {useDispatch} from "react-redux";

const Favorite = ({favorite}) => {
    // const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        restaurantName,
        type,
        address,
        schedule,
        contacts,
        averageCheck,
        dateOfPublish,
        averageRating,

    } = favorite

    return (
        <div className="super-favorite-main">
            <div className="favorite-main-container">
                <div className="favorite-info-container">

                    <div className="favorite-10-container">
                        <h3> {id}.</h3>
                        <h3> {restaurantName}</h3>
                    </div>
                    {/*<div className="favorite-20-container">*/}
                    {/*    <div>Type: {type}</div>*/}
                    {/*    <div>Address: {address}</div>*/}
                    {/*    <div>Schedule: {schedule}</div>*/}
                    {/*    <div>Contacts: {contacts}</div>*/}
                    {/*</div>*/}
                {/*    <div className="favorite-30-container">*/}
                {/*        <div>averageCheck: {averageCheck}</div>*/}
                {/*        <div>date of publish: {dateOfPublish}</div>*/}
                {/*        <div>rating: {averageRating}</div>*/}
                {/*    </div>*/}
                </div>
                {/*<div className="favorite-button-container">*/}

                    {/*<button*/}
                    {/*     onClick={() => dispatch(restaurantName.deleteFavoritesById({id}))}>delete*/}
                    {/*</button>*/}

                {/*</div>*/}
            </div>
        </div>
    );
};
export {Favorite};