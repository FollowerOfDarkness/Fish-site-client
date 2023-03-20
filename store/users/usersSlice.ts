import { BanUserDto } from './../../../server/src/users/dto/ban-user.dto';
// import { UserRoles } from '../../../server/src/roles/user-roles.model';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
// import userAPI from "../../http/userAPI"
import api from "../../pages/api/api"


interface IInitialStateAuth {
	id: number,
	users: any[],
	isLoading: boolean
}



const initialState: IInitialStateAuth = {
	id: -1,
	users: [],
	isLoading: false,
}

export const getUsers = createAsyncThunk(
	"/users",
	async (token: string) => {

		const userData = await api.getUsers(token)
		console.log("Thunk users >>>", userData)
		return userData
	}
)

export const banUser = createAsyncThunk(
	"/banfdsfds",
	async (banUserDto: BanUserDto) => {

		const userData = await api.banUser(banUserDto)
		console.log("Thunk banUser >>>", userData)
		return userData
	}
)

const users = createSlice({
	name: "users",
	initialState,
	reducers: {
		// toggleModalStatus(state) {
		// 	state.statusModal = !state.statusModal
		// },
		// toggleIsAuth(state, action: PayloadAction<boolean>) {
		// 	state.isAuth = action.payload
		// },
		// setToken(state, action) {

		// 	state.token = action.payload.token
		// }
	},
	extraReducers(builder) {
		builder

			.addCase(getUsers.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUsers.fulfilled, (state) => {
				state.isLoading = false
			})

	}
})

export const { } = users.actions

export default users.reducer