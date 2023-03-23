import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import './NewUserForm.css'
import {userActions} from "../../redux/slices/user.slice";

const NewUserForm = ({onClose}) => {

    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.userReducer);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        const newUser = {
            userName,
            password,
            role

        };
        e.preventDefault();

        const jsonBody = JSON.stringify(newUser);
        console.log(jsonBody);

        dispatch(userActions.saveNewUser(newUser))
        // Reset form fields
        setUserName('');
        setPassword('');
        setRole('');

        onClose();

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="user-form-container">
                <div className="user-singleForm-container">
                    {/*<label>Name:</label>*/}
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="user-singleForm-container">
                    {/*<label>Password:</label>*/}
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="user-singleForm-container">
                    {/*<label>Role:</label>*/}
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter your role"
                    />
                </div>

                <button type="submit">Sign Up</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewUserForm};