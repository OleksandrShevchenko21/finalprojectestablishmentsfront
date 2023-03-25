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
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        const newUser = {
            userName,
            password,
            role

        };
        e.preventDefault();
        if (!role) {
            setErrorMessage('*please choose a role');
            return;
        }

        const jsonBody = JSON.stringify(newUser);
        console.log(jsonBody);

        dispatch(userActions.saveNewUser(newUser))

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
                <div className="user-singleForm-container select-container">
                    {/*<label>Role:</label>*/}
                    {errorMessage &&
                        <p className="error-message">{errorMessage}</p>}
                    <select id="role-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select a role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewUserForm};