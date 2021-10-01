import axios from "axios";

const instance = axios.create({
	baseURL: "http://3.121.162.129:8000",
	timeout: 3000,
});

export default instance;
