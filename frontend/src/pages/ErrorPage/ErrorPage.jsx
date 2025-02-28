import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6 md:p-10 lg:p-16"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-xs md:max-w-md lg:max-w-lg text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="px-4 md:px-6 py-2 md:py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all text-sm md:text-base lg:text-lg"
        >
          Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;
