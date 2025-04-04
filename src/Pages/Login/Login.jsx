import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import Sociallogin from '../Shared/SocialLogin/Sociallogin';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D2B] px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:flex md:items-center md:justify-between">
                <div className="hidden md:block w-1/2">
                    <h1 className="text-4xl font-bold text-[#FE5F75]">Welcome Back!</h1>
                    <p className="mt-4 text-gray-600">
                        Login to your account and continue exploring our services.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FE5F75] focus:outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FE5F75] focus:outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-[#FE5F75] hover:underline">Forgot password?</a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 text-[#0D0D2B] font-bold bg-[#FE5F75] rounded-lg hover:bg-[#e54d63] transition-all">
                            Login
                        </button>
                    </form>
                    <Sociallogin />
                    <p className="mt-4 text-center text-gray-600">
                        New Here? <Link to="/signup" className="text-[#FE5F75] hover:underline">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;