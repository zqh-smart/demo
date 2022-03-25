import axios from 'axios';

const MyHttpServer = {};


MyHttpServer.install = function(Vue){

  axios.defaults.withCredentials = true;

 

  const instance = axios.create({
    baseURL: location.protocol + '//' + location.host + '/api',
	  // baseURL: 'http://127.0.0.1:9090/system',
    // baseURL: '/api'
  });

 instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，例如加入token
    console.log(config,'拦截器');
    // if(config.method === 'post' || config.method === 'POST'){
    //   config.headers = Object.assign(config.headers,{
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   })
    // }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  if(JSON.parse(localStorage.getItem('info') != undefined)){
  	 let username = JSON.parse(localStorage.getItem('info')).username;
  	  instance.defaults.headers.common['username'] = username;
  }

  
  Vue.prototype.$http = instance;

}

export default MyHttpServer;
