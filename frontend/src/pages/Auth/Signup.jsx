import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from './SocialLogin';

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            role: 'user',
          };
          axiosPublic.post('/users', userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully.',
                showConfirmButton: false,
                timer: 1500,
              });
              Navigate('/');
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      <Helmet>
        <title>Scholarship Management | Sign Up</title>
      </Helmet>
      <div className="h-full bg-[#F7F8FA] flex justify-center items-center py-4 lg:py-10">
        <div className="card bg-white shadow-sm w-full max-w-md p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mt-4">Create an Account</h2>
            <p className="text-sm text-gray-500">
              Join our community to manage scholarships!
            </p>
          </div>

          {/* Google Sign-In Button */}
          <div className="mt-6">
            <SocialLogin></SocialLogin>
          </div>

          {/* Separator */}
          <div className="flex items-center my-4">
            <hr className="w-full border-t border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="w-full border-t border-gray-300" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Full Name</span>
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
              {errors.name && (
                <span className="text-red-600 text-sm">Name is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="photoURL">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                id="photoURL"
                type="text"
                {...register('photoURL', { required: true })}
                placeholder="Enter your photo URL"
                className="input input-bordered w-full"
                required
              />
              {errors.photoURL && (
                <span className="text-red-600 text-sm">
                  Photo URL is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
              {errors.email && (
                <span className="text-red-600 text-sm">Email is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[33%] transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                </span>
                <label className="label">
                  <a
                    href="#"
                    className="text-[#ec4899] label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              {errors.password && (
                <span className="text-red-600 text-sm">
                  Password is required
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-[#017F4E] text-white hover:bg-[#008D54] w-full"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link className="text-[#017F4E] hover:underline" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
