import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/AuthSlice';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import AvatarPreview from './AvatarPreview';
import { toast } from 'react-toastify';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null,
    });
    const [errors, setErrors] = useState({});


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "avatar" && files.length > 0) {
            const file = files[0];
            if (file.size > MAX_FILE_SIZE) {
            // Display error message or handle large file here
            toast.error("File size exceeds the limit (5MB)");
            return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
            setFormData({ ...formData, avatar: reader.result });
            };
            reader.readAsDataURL(file); // Read the selected file as a data URL
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Clear password error when user types in the password field
        if (name === "password") {
            setErrors((prevErrors) => {
            return { ...prevErrors, password: "" };
            });
        }
    };


    const handleBlur = (e) => {
        const { name } = e.target;
        const newErrors = { ...errors };

        // Validation logic here
        if (!formData[name].trim()) {
            newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }

        setErrors(newErrors);
    };

    const handleFocus = (e) => {
        const { name } = e.target;
        const newErrors = { ...errors };

        // Clear error message when the field is focused
        newErrors[name] = '';

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic here
        let newErrors = {};
        // Sample validation for demonstration
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            dispatch(registerUser(formData))
                .then((response) => {
                    if(response.payload.user) {
                        toast.success(`Hello, ${formData.username}`);
                        setFormData({
                            username: "",
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            avatar: null,
                        });
                        navigate('/');
                    } else {
                        toast.error(response.payload.message);
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong. Please try again later")
                });
        }
    };

    return (
        <div className="flex justify-center items-center p-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                />
                {errors.username && (
                    <p className="text-red-500">{errors.username}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                {/* Password strength indicator */}
                <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                    Password
                </label>
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
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
                {/* Password strength indicator */}
                {formData.password.length > 0 && (
                    <PasswordStrengthIndicator password={formData.password} />
                )}
                {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                )}
                {/* Additional password error messages */}
                {errors.passwordDigit && (
                    <p className="text-red-500">{errors.passwordDigit}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
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
                {errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword}</p>
                )}
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
                    name="avatar"
                    onChange={handleChange}
                    accept='image/*'
                    className=" mt-4 p-1 h-10 w-[18rem] border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    {/* Avatar preview */}
                    {formData.avatar && <AvatarPreview image={formData.avatar} />}
                </div>
                </div>
                <div className="flex-col text-center py-2 items-center">
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
