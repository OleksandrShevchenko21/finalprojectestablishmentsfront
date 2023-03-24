import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userActions, userReducer} from "../../redux/slices/user.slice";
import jwt_decode from "jwt-decode";
import "./LoginPage.css"
import {bookingActions} from "../../redux/slices/booking.slice";
import {NewUserForm} from "../NewForm/NewUserForm";
import {userService} from "../../services";
import {createAsyncThunk} from "@reduxjs/toolkit";

const LoginPage = () => {
    const dispatch = useDispatch();
    // const role = useSelector(state => state.userReducer);


    // const {status, error, user} = useSelector(
    //     (state) => state.userReducer);

    const [userName, setUserName] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [role, setRole] = useState(null);


    const [loginError, setLoginError] = useState("");

    const [tokenUserName, setTokenUserName] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const handleLogIn = async (e) => {
        setShowLoginForm(true)
    }
    const handleSignUp = async (e) => {
        setShowSignUpForm(true)
    }

    const handleSignUpFormClose = () => {
        setShowSignUpForm(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userName || !password) {
            setLoginError("Please enter a valid username and password");
            return;
        }

        try {
            const logUser = {userName, password};
            await dispatch(userActions.getLogIn(logUser));


            const token = localStorage.getItem('token');

            const decodedToken = jwt_decode(token);

            // dispatch(userActions.getUserByName(userName))
            //     .then((response) => {
            //         setRole(response.data);
            //         console.log(response.data);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });

            setUserName("");
            setPassword("");
            setLoginError("");

            setRole(userService.getUserByName(userName).role);
        } catch (error) {
            setLoginError(error.message);
        }
        console.log(token);
        window.location.reload(true);
    };
    const handleLogOut = (e) => {
        dispatch(userActions.logOut())
        window.location.reload(true);
    }

    const token = localStorage.getItem('token');
    useEffect(() => {

        if (token) {
            const decodedToken = jwt_decode(token);
            const userName = decodedToken.sub;
            setTokenUserName(userName);
            // console.log(dispatch(userActions.getUserByName(userName)));
            const x = userService.getUserByName(userName);
            setRole(x.role);
            console.log(role);
        }
    }, [token]);
    // console.log(currentUser.role);

    return (
        <div>
            <div>
                {token ? (
                    <div className="login-welcome-container">
                        <h6>Welcome, {tokenUserName}!
                            <br/>
                            role: {role}
                        </h6>

                        <button onClick={handleLogOut}>Log out</button>

                    </div>
                ) : (
                    showSignUpForm ? (
                        <div>
                            <NewUserForm onClose={handleSignUpFormClose}/>
                        </div>

                    ) : (
                        showLoginForm ? (
                            <form onSubmit={handleSubmit}>
                                <div className="login-form-container">
                                    <div className="login-singleForm-container">
                                        {/*<label>Name:</label>*/}
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                    <div className="login-singleForm-container">
                                        {/*<label>Password:</label>*/}
                                        <input
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit">Log in</button>


                                    {/*{status === "loading" && <p>Loading...</p>}*/}
                                    {/*{status === "error" && <p>{error}</p>}*/}
                                    {loginError && <p>{loginError}</p>}
                                </div>
                            </form>
                        ) : (
                            <div className="login-form-container">
                                <button onClick={handleLogIn}>Log in</button>
                                <button onClick={handleSignUp}>Sign up</button>
                            </div>
                        )
                    )
                )}
                {/*</div>)}*/}
            </div>
            {/*<div>*/}
            {/*</div>*/}
        < /div>
    );
};
export {
    LoginPage
};
