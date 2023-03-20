import { UserRoles } from './../../../server/src/roles/user-roles.model';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import userAPI from "../../http/userAPI"
import api from "../../pages/api/api"
import jwtDecode from "jwt-decode"

interface IInitialStateAuth {
	id: number,
	email: string,
	role: string,
	statusModal: boolean,
	token: string | AxiosResponse<any>,
	isAuth: boolean,
	isLoading: boolean
}
interface IPaylodInfoUser {
	email: string,
	exp: number,
	iat: number,
	id: number,
	token: string,
	roles: [
		{
			UserRoles: { id: number, roleId: number, userId: number }
			createdAt: string
			description: string
			id: number
			updatedAt: string
			value: "ADMIN" | "USER"
		}
	]
}

export interface IAuthData {
	[key: string]: string
}
export type TTokenObj = { token: IInitialStateAuth["token"] }
export interface IErrorLogin {
	error: { message: string },
	meta: any,
	payload: string,
	type: string
}

const initialState: IInitialStateAuth = {
	id: -1,
	email: "",
	role: "",
	statusModal: false,
	token: "asfds",
	isAuth: false,
	isLoading: false,
}
export const login = createAsyncThunk(
	"auth/login",
	async ({ username, password }: IAuthData) => {
		const userData = await api.login({ email: username, password })
		return userData
	}
)
// export const getUsers = createAsyncThunk(
// 	"/users",
// 	async (token) => {

// 		const userData = await api.getUsers(token)
// 		return userData
// 	}
// )

const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		toggleModalStatus(state) {
			state.statusModal = !state.statusModal
		},
		toggleIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		},
		setToken(state, action) {

			state.token = action.payload.token
		}
	},
	extraReducers(builder) {
		builder
			.addCase(login.fulfilled, (state, action) => {

				const token = action.payload.token
				localStorage.setItem('token', token)
				if (action.payload) {
					const actionPayload = jwtDecode(token) as IPaylodInfoUser

					state.id = actionPayload.id
					state.role = actionPayload.roles[0].value
					state.email = actionPayload.email
					state.isAuth = true

				}



				console.log("ExtraReducer login", action)
			})
		// .addCase(getUsers.pending, (state) => {
		// 	state.isLoading = true
		// })
		// .addCase(getUsers.fulfilled, (state) => {
		// 	state.isLoading = false
		// })

	}
})

export const { toggleModalStatus, setToken, toggleIsAuth } = auth.actions

export default auth.reducer