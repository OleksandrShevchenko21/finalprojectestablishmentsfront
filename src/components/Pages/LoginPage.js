import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userActions} from "../../redux/slices/user.slice";
import jwt_decode from "jwt-decode";
import "./LoginPage.css"

const LoginPage = () => {
    const dispatch = useDispatch();

    const {status, error} = useSelector(
        (state) => state.userReducer);
    const [userName, setUserName] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [loginError, setLoginError] = useState("");

    const [tokenUserName, setTokenUserName] = useState("");

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
            console.log(token);
            if (!token) {
                setLoginError("Token not found in localStorage");
                return;
            }
            const decodedToken = jwt_decode(token);
            // console.log(decodedToken);
            setUserName("");
            setPassword("");
            setLoginError("");
        } catch (error) {
            setLoginError(error.message);
        }
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
        }
    }, [token]);
    return (
        <div>
            {token ? (
                <div className="login-welcome-container">
                    <h6>Welcome, {tokenUserName}!</h6>
                    <button onClick={handleLogOut}>Log out</button>
                </div>
            ) : (<form onSubmit={handleSubmit}>
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
            )}
        < /div>
    );
};
export {LoginPage};
