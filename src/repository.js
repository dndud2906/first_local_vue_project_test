import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export function searchCamera(searchType,value){
    return axios.get(`${BASE_URL}/api/camera/search`,{params:{
        type:searchType,
        value:value
    }})
    .then(response => response.data);
}

export function getCameras(){
    return axios.get(`${BASE_URL}/api/camera/list`)
        .then(response => response.data);
}

export function deleteCamera(id){
    return axios.post(`${BASE_URL}/api/camera/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

export function addCamera(data){
    console.log("addData",data)
    return axios.post(`${BASE_URL}/api/camera/add`,
    {
        cName: data.cName,
        label: data.label,
        objType: data.objType,
        rtspURI: data.rtspURI
    }).then(response => {return response.data}).catch(err => Promise.reject(err.message));
}

export function editCamera(data, id){
    return axios.post(`${BASE_URL}/api/camera/edit/${id}`,{data})
        .then(response => {return response.data})
        .catch(err => Promise.reject(err.message));
}