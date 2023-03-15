import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";
import './NewUsertForm.css'
import {userActions} from "../../redux/slices/user.slice";

const NewUserForm = () => {

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

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="singleForm-container">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="singleForm-container">
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <button type="submit">Add User</button>

                {/*{status === "loading" && <p>Loading...</p>}*/}
                {/*{status === "error" && <p>{error}</p>}*/}

            </div>
        </form>
    );
}
export {NewUserForm};