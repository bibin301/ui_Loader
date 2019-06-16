import axios from 'axios';

const _axios = axios.create({
  timeout: 10000, // 10 seconds
  headers: {
    'secret-code': process.env.REACT_APP_SECRET_CODE,
  }
});

export default _axios;