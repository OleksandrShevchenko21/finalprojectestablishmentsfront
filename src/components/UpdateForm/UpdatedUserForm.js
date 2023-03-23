import {UserActions} from "../../redux";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Users} from "../Users/Users";
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


    useEffect(() => {
        setId(user.id);
        setUserName(user.userName);
        setPassword(user.password);
        setRole(user.role);

    }, [user]);


    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            // id,
            userName,
            password,
            role
        };

        const jsonBody = JSON.stringify(updatedUser);

        dispatch(userActions.updateUser({id, updatedUser}));
        onUpdate(id, updatedUser);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        readOnly
                    />
                </div>
                <div>
                    <label>User Name:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
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