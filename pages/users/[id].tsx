import Layout from "../../components/Layout"
import UserInfo from "../../components/UserInfo"

// export const getServerSideProps = async (context) => {
// 	const { id } = context.params
// 	console.log(context)
// 	// const data = await api.getUsers()
// 	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
// 	const data: [] = await response.json()

// 	if (!data) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	return {
// 		props: { user: data }
// 	}
// }

const User = ({ user }) => {
	return (
		<>
			<UserInfo user={user} />


		</>
	)
}

export default User

