import { IAuthData } from '../../store/auth/authSlice';
import axios from "axios"


export const axiosServer = axios.create({
	baseURL: `http://localhost:${process.env.NEXT_PUBLIC_PORT}`,
	withCredentials: false
})

const login = async (passName) => {
	return await axiosServer.post("/auth/login", passName).then(
		(x) => {
			console.log("Api data >>>", x.data)
			return x.data
		},
		(e) => Promise.reject(e.response?.data)
	)
	console.log(process.env.NEXT_PUBLIC_PORT)
}

const getUsers = async (token: string) => {

	return await axiosServer.get("/users", {
		headers: {
			Authorization: token
		}
	}).then(
		(x) => {
			console.log("Api data >>>", x.data)
			return x.data
		},
		(e) => Promise.reject(e.response?.data)
	)

}
const banUser = async (banUserDto) => {

	return await axiosServer.post("/users/ban", banUserDto).then(
		(x) => {
			console.log("Api banUser >>>", x.data)
			return x.data
		},
		(e) => Promise.reject(e.response?.data)
	)

}
export default {
	login,
	getUsers,
	banUser
}