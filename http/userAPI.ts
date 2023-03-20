import jwtDecode from "jwt-decode"
import { $host } from "."



export const registration = async (email: string, password: string) => {
	const { data } = await $host.post('api/auth/registration', { email, password })
	return jwtDecode(data.token)
}

const login = async (email: string, password: string) => {
	const { data } = await $host.post('auth/login', { email, password })

	return jwtDecode(data.token)
}

export const check = async (email: string, password: string) => {
	const response = await $host.post('auth/login', { email, password })
	return response
}

export default {
	login
}