import React, {useEffect} from "react";
import api from './helpers/http';

const useAuth = () => {
  const [state, setState] = React.useState({
    loading: true,
    auth: false,
  });

  const auth = React.useMemo(() => ({
    success() {
      setState({
        loading: false,
        auth: true,
      });
    },
    failed() {
      setState({
        auth: false,
        loading: false,
      });
    }
  }), []);
  const fetchData = () => {

  };
  useEffect(() => {
    if (state.loading) {
      if (!localStorage.getItem('identify') || !localStorage.getItem('Authorization')) {
        auth.failed();
      } else {
        api.auth().then(res => {
          if (res.status === 'success') {
            auth.success();
          } else {
            auth.failed();
          }
        });
      }
    }
  }, [auth, state.loading]);

  return [state, auth];
};

export {useAuth};
