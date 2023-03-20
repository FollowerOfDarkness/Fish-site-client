import Heading from "./Heading"

const UserInfo = ({ user }) => {
	const { name, email, id, banned, banReason } = user || {}

	if (!user) {
		return <Heading tag="h3" text="Пустой контакт" />
	}
	return (
		<>
			<Heading tag="h3" text={id} />
			<div>
				<strong>Name: </strong>
				{name}
				<strong>Email: </strong>
				{email}

				<strong>Ban: </strong>
				{banned ? "Yes" : "No"}
			</div>
		</>
	)
}

export default UserInfo