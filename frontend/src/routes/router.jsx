import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import MainLayouts from '../layouts/MainLayouts';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/Signup';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      // {
      //   path: '/task/:taskId',
      //   element: (
      //     <PrivateRoute>
      //       <Task />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/todo',
      //   element: (
      //     <PrivateRoute>
      //       <Todo />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/inprogress',
      //   element: (
      //     <PrivateRoute>
      //       <InProgress />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/completed',
      //   element: (
      //     <PrivateRoute>
      //       <Completed />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
