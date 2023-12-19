import React from 'react'
import { Container } from 'react-bootstrap';
import './Login.scss';
import { loginUser } from '../services/LoginService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectAccessToken } from '../redux/feature/authen/authSlice';
import { userPayload } from '../redux/feature/data/UserSlice';


const Login = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [loadingApi, setLoadingApi] = React.useState(false);

    const obj = {
        email: email.trim(),
        password: password
    }

    const dispatch = useDispatch();
    const token = useSelector(selectAccessToken);

    React.useEffect(() => {
        if (token) {
            navigate("/Home");
        }
    }, []);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or password is required !");
            return;
        }
        setLoadingApi(true);
        let res = await loginUser(obj);
        if (res && res.data) {
            toast.success(res.message);
            dispatch(logIn(res.data));
            dispatch(userPayload(email));
            navigate("/Home");
        }
        setLoadingApi(false);
    }

    const handleKeyPress = (event) => {
        if (event.code === "Enter") {
            handleLogin();
        }
    }

    return (
        <>
            <Container>
                <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-12 col-md-9">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-1">
                                <div className='row justify-content-center'>
                                    <div class="col-lg-6 p-4">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <div class="form-group p-2">
                                                <input type="email" class="form-control form-control-user p-2"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                />
                                            </div>
                                            <div class="form-group p-2 input-pass">
                                                <input type={isShowPassword ? "text" : "password"} class="form-control form-control-user p-2"
                                                    id="exampleInputPassword" placeholder="Password"
                                                    value={password}
                                                    onChange={(event) => setPassword(event.target.value)}
                                                    onKeyDown={(event) => handleKeyPress(event)}
                                                    tabIndex={0}
                                                />
                                                <i className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                                    hidden={password ? false : true}
                                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                                ></i>
                                            </div>
                                            {/* <div class="form-group">
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                        <label class="custom-control-label" for="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div> */}
                                            <div className='form-group btn-login p-2 w-100 mt-3'>
                                                <button className={email && password ? "active" : ""}
                                                    disabled={email && password ? false : true}
                                                    hidden={email && password ? false : true}
                                                    onClick={() => handleLogin()}
                                                >
                                                    {loadingApi && <i class="fas fa-circle-notch fa-spin"></i>}
                                                    &nbsp;Login
                                                </button>
                                            </div>
                                            <hr />
                                            <button className='btn-back'>
                                                <i class="fa-solid fa-chevron-left"></i>
                                                <span>Go Back !</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </Container>
        </>
    )
}

export default Login