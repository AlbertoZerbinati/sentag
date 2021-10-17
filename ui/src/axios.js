import axios from "axios";

const instance = axios.create({
	// baseURL: "http://3.121.162.129:8000",
	baseURL: "http://127.0.0.1:8000",
	timeout: 3000,
});

export default instance;