
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/slices/user.slice";
import"./UpdatedUserForm.css"

const UpdateUserForm = ({user, onUpdate, onClose, resetForm}) => {

    console.log(user);

    const {status, error}
        = useSelector((state) => state.userReducer);
    const [id, setId] = useState(user.id);
    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState(user.password);
    const [role, setRole] = useState(user.role);
    const [number, setNumber] = useState(user.number);
    const [email, setEmail] = useState(user.email);


    useEffect(() => {
        setId(user.id);
        setUserName(user.userName);
        setPassword(user.password);
        setRole(user.role);
        setNumber(user.number);
        setEmail(user.email);

    }, [user]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            // id,
            userName,
            password,
            role,
            number,
            email
        };

        const jsonBody = JSON.stringify(updatedUser);

        dispatch(userActions.updateUser({id, updatedUser}));
        onUpdate(id, updatedUser);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="updated-user-form-container">
                <div className="updated-user-single-form-container">
                    <label>Number:</label>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="updated-user-single-form-container">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>

                <button type="submit">update</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}
            </div>
        </form>

    );
}
export {UpdateUserForm};