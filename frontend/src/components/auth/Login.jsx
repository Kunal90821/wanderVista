import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch }from 'react-redux';
import { loginUser} from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = (userCredentials) => {
    dispatch(loginUser(userCredentials))
      .then((response) => {
        if(response.payload.user) {
          toast.success(`Hello, ${userCredentials.username}`);
          reset();
          navigate('/');
        } else {
          toast.error('Invalid Login Credentials');
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again later");
        console.error(error)
      });
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4 pb-4">
          <div className="inline-flex">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              {errors.username && (
                <p className="text-red-500 px-2">*</p>
              )}
            </div>
            <input
              type="text"
              id="username"
              name="username"
              {...register("username", { required: true })}
              className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${errors.username && "focus:ring-red-500" }`}
            />
          </div>
          <div className="mb-4 pb-4">
            <div className="inline-flex">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              {errors.password && <p className="text-red-500 px-2">*</p>}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                {...register("password", { required: true })}
                className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${errors.password && "focus:ring-red-500" }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[1.1rem] focus:outline-none"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
          <div className="flex-col text-center py-4 items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Sign In
            </button>
            <p className="text-md">
              Create Account?{" "}
              <Link to="/register" className="text-blue-500 font-semibold">
                Register Now
              </Link>
            </p>
          </div>
        </form>
        <div className="text-center flex font-semibold p-2">
          <hr className="inline-block mt-3 w-1/3" />
          <p className="text-red-500 px-2">or login with</p>
          <hr className="inline-block mt-3 w-1/3" />
        </div>
        <div className="mt-2 flex justify-center space-x-4">
          <FaGoogle className="cursor-pointer hover:text-gray-800 text-2xl" />
          <FaGithub className="cursor-pointer hover:text-gray-800 text-2xl" />
          <FaLinkedin className="cursor-pointer hover:text-gray-800 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Login;
