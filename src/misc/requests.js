import axios from "axios";

export function httpPost(URL, data) {
  URL = 'http://127.0.0.1:5000' + URL;
  const requests = async () => {
    await axios.post(URL, data)
      .then(res => {
        console.log(res);
      });
  };
  requests().catch(err => {
    console.log("error", err.message);
  });
}
