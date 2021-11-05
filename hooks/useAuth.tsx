import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { rootState } from '../store';

const useAuth = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter();
      const token = localStorage.getItem('token');

      // If there is no access token we redirect to "/" page.
      if (!token) {
        Router.push('/Login');
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default useAuth;
