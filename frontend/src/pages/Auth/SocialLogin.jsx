import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // To show success or error alerts
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      // Send user info to backend
      const res = await axiosPublic.post('/users', userInfo);

      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User created successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/'); // Redirect after successful sign-up
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Google sign-in failed. Please try again.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-base-100 border hover:bg-white flex items-center justify-center py-2"
        disabled={loading}
      >
        <FcGoogle className="mr-2" size={20} />
        {loading ? 'Signing up with Google...' : 'Sign Up with Google'}
      </button>
    </div>
  );
};

export default SocialLogin;
