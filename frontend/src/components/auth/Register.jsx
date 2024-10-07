import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import AvatarPreview from './AvatarPreview';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors }} = useForm()


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const password = watch("password")      // to watch the password field for password matching
    const avatar = watch("avatar")

    const handleRegister = async (userCredentials) => {
        const avatarFiles = userCredentials.avatar

        let avatarFile

        if(avatarFiles && avatarFiles.length > 0) {

            avatarFile = avatarFiles[0]
            // convert the file into base64(string)
            const reader = new FileReader()
            reader.readAsDataUrl(avatarFile)

            reader.onloadend = () => {
                // add base 64 into userCredentials

                userCredentials.avatar = reader.result

                // dispatch the updated user credentials
                dispatch(registerUser(userCredentials))
                    .then(response => {
                        if(response.payload.user) {
                            toast.success(`Hello ${userCredentials.username}`)
                            reset()
                            navigate('/')
                        } else {
                            toast.error(response.error.message)
                        }
                    })
                    .catch(error => {
                        toast.error(`Something went wrong. Please try again later.`)
                        console.error(error)
                    })
            }

            reader.onerror = () => {
                toast.error("Error uploading avatar. Please try again.")
            }
        } else {
            // dispatch without avatar

            userCredentials.avatar = ''

            dispatch(registerUser(userCredentials))
                .then(response => {
                    if(response.payload.user) {
                        toast.success(`Hello ${userCredentials.username}`)
                        reset()
                        navigate('/')
                    } else {
                        toast.error(response.error.message)
                        console.log(response)
                    }
                })
                .catch(error => {
                    toast.error(`Something went wrong. Try again later.`)
                    console.log(error)
                })
        }

    }

    // avatar file size validation
    const validateAvatarSize = (value) => {
        // checks if avatar file exists
        if(value && value.length > 0) {
            const file = value[0]
            return file.size <= MAX_FILE_SIZE || "Avatar must be less than 5mb"
        }
        return true
    }

    return (
        <div className="flex justify-center items-center p-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={(handleSubmit(handleRegister))}>
                    <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {required: 'Username is required'})}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.username && (
                        <p className="text-red-500">{errors.username.message}</p>
                    )}
                    </div>
                    <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: 'Name is required' })}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: 'Email is required' })}
                        className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...register("password", { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters.'} })}
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 rounded-full bg-white p-[.4rem] top-[.7rem] focus:outline-none"
                            >
                            {showPassword ? <HiEyeOff /> : <HiEye />}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        {/* Password strength indicator */}
                        {password && <PasswordStrengthIndicator password={password} />}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            {...register("confirmPassword", { required: 'Confirm password is required', validate: value => value === password || 'Passwords do not match' })}
                            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200 `}
                            />
                            <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 rounded-full bg-white p-[.4rem] top-[.7rem] focus:outline-none"
                            >
                            {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                    </div>
                    {/* Avatar upload */}
                    <div className="mb-4 h-20">
                        <label htmlFor="avatar" className="block text-gray-700">
                            Avatar
                        </label>
                        <div className="inline-flex justify-between w-full">
                            <input
                            type="file"
                            id="avatar"
                            {...register("avatar", { validate: validateAvatarSize})}
                            accept='image/*'
                            className=" mt-4 p-1 h-10 w-[18rem] border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                            {/* Avatar preview */}
                            {avatar && avatar.length > 0  && <AvatarPreview image={avatar}/>}
                        </div>
                        {errors.avatar && <p className='text-red-500'>{errors.avatar.message}</p>}
                    </div>
                    <div className="flex-col text-center py-4 items-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Sign Up
                        </button>
                        <p className="text-md py-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 font-semibold">
                            Login
                            </Link>
                        </p>
                    </div>
                </form>
                <div className="text-center flex font-semibold p-2">
                    <hr className="inline-block mt-3 w-1/3" />
                    <p className="text-red-500 px-2">or signup with</p>
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

export default Register;
