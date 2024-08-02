import axios from 'axios';

// API URL들을 쉼표로 구분된 문자열에서 배열로 변환
const apiUrls = (process.env.VUE_APP_API_URLS || process.env.VUE_APP_API_URL || '/api').split(',');

let currentApiUrlIndex = 0;

const getNextApiUrl = () => {
  currentApiUrlIndex = (currentApiUrlIndex + 1) % apiUrls.length;
  return apiUrls[currentApiUrlIndex];
};

console.log('Available API URLs:', apiUrls);

const instance = axios.create({
  baseURL: apiUrls[currentApiUrlIndex],
});

// Axios 인터셉터를 사용하여 요청 실패 시 다음 URL 시도
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config && error.config.__retryCount < apiUrls.length - 1) {
      error.config.__retryCount = error.config.__retryCount || 0;
      error.config.__retryCount++;
      error.config.baseURL = getNextApiUrl();
      console.log('Retrying with new baseURL:', error.config.baseURL);
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;