import Head from "next/head"
import { useEffect, useState } from "react"
import Heading from "../../components/Heading"
import axios from "axios"
import { loadGetInitialProps } from "next/dist/shared/lib/utils"

const Contacts = ({ stars }) => {
	const [contacts, setContats] = useState(null)
	const config = {
		headers: { authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFETUlOIiwiaWQiOjEwLCJyb2xlcyI6W3siaWQiOjEsInZhbHVlIjoiQURNSU4iLCJkZXNjcmlwdGlvbiI6IkFkbWluaXN0cmF0b3IiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTEyVDIwOjExOjQwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTEyVDIwOjExOjQwLjAwMFoiLCJVc2VyUm9sZXMiOnsiaWQiOjUsInJvbGVJZCI6MSwidXNlcklkIjoxMH19XSwiaWF0IjoxNjY5MDUwMTk2LCJleHAiOjE2NjkxMzY1OTZ9._02Q-wNjYDvAnOx_kmPPnfAw6qsTTcviVH3eVT81oeo"}` }
	}

	useEffect(() => {

		const fetchData = async () => {
			const response = await axios.get('http://localhost:7000/users',
				config
			)
			const data = await response.data
			setContats(data)
			return data
		}
		fetchData()
	}, [])
	return (
		<>
			<Head>
				<title>{stars}</title>
			</Head>

		</>

	)
}
// Contacts.getInitialProps = async (ctx) => {
// 	const response = await fetch('http://localhost:7000/users')
// 	const data = await response.json()
// 	return { stars: data }
// }

export default Contacts