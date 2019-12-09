import {useEffect, useState} from "react";
import axios from "axios";

export function useRequests(URL) {
  URL = 'http://127.0.0.1:5000' + URL;
  const [state, setState] = useState('');
  useEffect(() => {
    const source = axios.CancelToken.source();
    const requests = async () => {
      await axios.get(URL, {
        cancelToken: source.token,
      })
        .then(res => {
          setState(res.data);
        });
    };
    requests().catch(err => {
      console.log("error", err.message);
    });
    return () => {
      source.cancel();
    };
  }, [URL]);
  return state;
}
