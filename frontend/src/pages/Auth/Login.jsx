import { useContext, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Password visibility icons
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const axiosPublic = useAxiosPublic();

  const from = location?.state?.from?.pathname || '/';

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoUrl: result.user?.photoURL,
          role: 'user',
        };

        axiosPublic
          .post('/users', userInfo)
          .then((res) => {
            toast.success('Google Login Successful!');
            navigate(from, { replace: true });
          })
          .catch((error) => toast.error('Error while creating user.'));
      })
      .catch(() => toast.error('Google Sign-In failed.'));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success('Login Successful!');
        navigate(from, { replace: true });
      })
      .catch((error) => toast.error('Invalid credentials or error.'));
  };

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  return (
    <div className="h-full bg-[#F4F7FC] flex justify-center items-center py-6 lg:py-12">
      <Helmet>
        <title>Edu-Track | Login</title>
      </Helmet>
      <div className="card bg-white shadow-lg w-full max-w-md p-10 rounded-xl border border-gray-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#134479]">
            Welcome To Edu-Track Scholarship Portal
          </h2>
        </div>

        {/* Google Sign-In Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-[#4285F4] hover:bg-[#357AE8] text-white flex items-center justify-center py-3 rounded-lg transition duration-300"
          >
            <FcGoogle className="mr-2" size={20} />
            Sign In with Google
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center my-6">
          <hr className="w-full border-t border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="w-full border-t border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="form-control">
            <label className="label text-[#134479]" htmlFor="email">
              <span className="label-text text-lg font-medium">
                Email Address
              </span>
            </label>
            <input
              id="email"
              name="email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full py-3 px-4 rounded-lg text-lg"
              required
            />
          </div>

          <div className="form-control">
            <label className="label text-[#134479]" htmlFor="password">
              <span className="label-text text-lg font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered w-full py-3 px-4 rounded-lg text-lg"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </span>
            </div>
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="btn bg-[#134479] text-white hover:bg-[#0e62bb] w-full py-3 rounded-lg transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              className="text-[#134479] hover:underline font-medium"
              to="/signup"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
