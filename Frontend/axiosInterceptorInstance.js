import axios from "axios";

const axiosInterceptorInstance = axios.create({
    baseURL: 'http://localhost:8000',
})
if (axiosInterceptorInstance) {
    console.log("Server is connect ");
}

export default axiosInterceptorInstance;