import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import MainLayouts from '../layouts/MainLayouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts></MainLayouts>,
    // errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Dashboard></Dashboard>,
      },
      //   {
      //     path: '/task',
      //     element: <Task></Task>,
      //   },
      //   {
      //     path: '/todo',
      //     element: <Todo></Todo>,
      //   },
      //   {
      //     path: '/inProgress',
      //     element: <InProgress></InProgress>,
      //   },
      //   {
      //     path: '/completed',
      //     element: <Compleate></Compleate>,
      //   },
      //   {
      //     path: '/signIn',
      //     element: <SignIn></SignIn>,
      //   },
      //   {
      //     path: '/signUp',
      //     element: <SignUp></SignUp>,
      //   },
    ],
  },
]);

export default router;
