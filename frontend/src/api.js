import axios from "axios";

const api=axios.create({
    baseURL:"https://jobs-portal-backend-t3m4.onrender.com/api",
    //http://localhost:4000/api
    withCredentials: true,
})
export default api;