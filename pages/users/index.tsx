import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
// import { useSession, signIn, signOut, getSession } from "next-auth/react"
import api from "../api/api"
import Heading from "../../components/Heading"
import Link from "next/link"
import styles from '../../styles/Users.module.scss'
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { banUser, getUsers } from "../../store/users/usersSlice"
// import withSession from '../../lib/session'

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const filterUsers = (data: any) => {

	if (Array.isArray(data) && data.length > 0) {
		const globalArr: any[] = []
		data.forEach(elem => {
			let globalObj = {} as { [key: string]: string | number }
			for (let [key, value] of Object.entries(elem)) {
				if (typeof value === 'object') {
					globalObj = { ...globalObj, ...filterUsers(value) }
				} else if (key === "id") {
					globalObj = { ...globalObj, key: value as string | number }
					globalObj = { ...globalObj, [key]: value as string | number }
				} else {
					globalObj = { ...globalObj, [key]: value as string | number }
				}
			}
			globalArr.push(globalObj)
		})
		console.log(globalArr)
		return globalArr
	}
	if (typeof data === "object") {
		let obj = {}
		for (let [key, value] of Object.entries(data)) {
			obj = { ...obj, [key]: value as string | number }
		}
		return obj
	}

}

export const getServerSideProps = async () => {
	// const token = sessionStorage.getItem('token')
	// const session = await getSession(context)
	// const data = await api.getUsers()
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	const data: [] = await response.json()

	// console.log(context.req.headers)
	if (!data) {
		return {
			notFound: true
		}
	}
	// console.log(data)
	return {
		props: {
			users: filterUsers(data)
		}
	}
}


const Users = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth)
	const isLoading = useAppSelector((state) => state.auth.isLoading)
	const dispatch = useAppDispatch()
	// const router = useRouter()
	// console.log(session)
	const [users, setUsers] = useState<any[]>([]);
	const [isError, setIsError] = useState(false)
	const [errMessage, setErrMessage] = useState("")
	const ban = async (params) => {
		console.log("Users page ban >>>", params)
		debugger
		const response = await dispatch(banUser({
			userId: params.id,
			banReason: "Admin send"
		}))
	}
	// const fetchUsers = async () => {
	// 	const token = `Bearer ${localStorage.getItem("token")}`
	// 	const response = await api.getUsers(token!)
	// 	return response
	// }
	// (async () => {

	// const data = await api.getUsers(token!)


	useEffect(() => {

		const fetchUsers = async () => {
			try {
				const token = `Bearer ${localStorage.getItem("token")}`
				const response = await dispatch(getUsers(token!))
				console.log("Users page >>>", response)
				if (response?.error) {
					setIsError(true)
					setErrMessage(response.error.message ? response.error.message : "Произошла ошибка при загрузке данных")
					return
				}
				setUsers(response.payload)
			} catch (error) {
				console.log("Users page error >>>", error)
				setIsError(true)
			}

		}
		fetchUsers()





	}, [isAuth, isError])
	// const data: [] = await response.json()
	// const response = await fetch('https://jsonplaceholder.typicode.com/users')
	// const data: [] = await response.json()

	// setUsers(response)


	// isAuth || router.push("/")
	// })
	// useEffect(() => {
	// 	isAuth ? false : router.push('/404')
	// })

	const columns: ColumnsType<DataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <Link href={`/users/${text.split(" ")}`}>{text}</Link>,
		},
		{
			title: 'Banned',
			dataIndex: 'banned',
			key: 'ban',
			render: (text) => <div>{text ? "Yes" : "No"}</div>,
		},
		{
			title: 'Role',
			dataIndex: 'roles',
			key: 'role',
			render: (text: any[]) => {
				let value
				text.forEach(role => {
					if (role.value === "ADMIN")
						value = role.value

				})
				return <div>{value ? value : "USER"}</div>
			},
		},
		// {
		// 	title: 'Tags',
		// 	key: 'tags',
		// 	dataIndex: 'tags',
		// 	render: (_, { tags }) => (
		// 		<>
		// 			{tags.map((tag) => {
		// 				let color = tag.length > 5 ? 'geekblue' : 'green';
		// 				if (tag === 'loser') {
		// 					color = 'volcano';
		// 				}
		// 				return (
		// 					<Tag color={color} key={tag}>
		// 						{tag.toUpperCase()}
		// 					</Tag>
		// 				);
		// 			})}
		// 		</>
		// 	),
		// },
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a onClick={() => ban(record)}>Ban</a>
					<a onClick={() => console.log("Delete click", record)}>Delete</a>
				</Space>
			),
		},
	];


	// useEffect(() => {
	// 	filterUsers(users)
	// }, [])

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<Heading tag="h3" text="Users list" />

				{/* {console.log(isAuth, users)} */}
				{+isError && users.length === 0
					? <div>{errMessage}</div>
					: <Table key={Math.random()} columns={columns} loading={isLoading} dataSource={users} />
				}

				{/* <Button onClick={() => console.log(isAuth)}>Click</Button> */}

			</div>
		</div>
	)
}


export default Users

// export async function getServerSideProps(context) {
// 	const session = await getSession(context)
// 	return {
// 		props: {
// 			data: session ? "List 200" : "List free"
// 		}
// 	}
// }