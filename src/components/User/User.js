import {useDispatch} from "react-redux";
import {userActions} from "../../redux/slices/user.slice";

const User = ({user, onEdit}) =>{
    const dispatch = useDispatch();
    // const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {
        id,
        userName,
        password,
        role
    } = user

    return (
        <div>
            <div>id: {id}</div>
            <div>username: {userName}</div>
            <div>password: {password}</div>
            <div>role: {role}</div>

            <button
                onClick={() => dispatch(userActions.getUserByID({id}))}>Select
                User
            </button>
            {/*<button onClick={()=>dispatch(restaurantActions.saveRestaurantByID({id}))}>add</button>*/}
            <button onClick={() => dispatch(userActions.deleteUserByID({id}))}>delete</button>
            <button onClick={() => onEdit(user)}>Edit</button>
        </div>
    );
};
export {User};