import axios from "axios";



const $host = axios.create({
	baseURL: `http://localhost:${process.env.NEXT_PUBLIC_PORT}`,
})

const $authHost = axios.create({
	baseURL: `http://localhost:${process.env.NEXT_PUBLIC_PORT}`,
})

const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
	$authHost,
	$host
}