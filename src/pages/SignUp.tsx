import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../redux/features/user/userThunk';

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { user, isLoading} = useAppSelector(state => state.user);
  useEffect(()=> {
    if(!isLoading && user.email){
      navigate('/')
    }
  }, [user.email, isLoading])

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // TODO: Add signup logic here using the formData state
    console.log(formData);
    if( formData.password === formData.confirmPassword){
        dispatch(createUser({
            email: formData.email,
            username: formData.username,
            password: formData.password
        }))
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login clicked');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-72">
        <div className="mb-3">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 h-10 border px-3 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>

      <div className="flex items-center mt-4 ">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="mx-4 text-gray-500">or</div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="w-72 py-2 px-4 border flex justify-center border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        <span>Continue with Google</span> <FcGoogle  className="h-5 w-10"/>
      </button>
    </div>
  );
};

export default SignUp;