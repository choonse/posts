import axios from 'axios';

const client = axios.create();


/*
client.defaults.baseURL = 'https://external-api-server.com/'

//헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a12c3d4';

//인터셉터 설정
axios.intercepter.response.use(\
    response=>{
        //성공 시 특정 작업 수행
        return response;
    },
    error=>{
        //요청 실패 시
        return Promise.reject(error);
    }
    })

*/


export default client;