import Image from "next/image"
import Link from "next/link"
import { Router, useRouter } from "next/router"
import styles from "../styles/Navbar.module.scss"
import logo from '../public/logo-fish.jpg'
import Button from "./Button"
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleIsAuth, toggleModalStatus } from "../store/auth/authSlice"
import { useEffect, useState } from "react"

const navigation = [
	{ id: 1, title: 'Главная', path: '/' },
	{ id: 2, title: 'Прогноз', path: '/prognosis' },
	// { id: 3, title: 'Отчеты', path: '/contacts' },
	{ id: 4, title: 'Личный кабинет', path: '/users' },
]

const Navbar = () => {
	const { pathname } = useRouter()
	const dispatch = useAppDispatch()
	// const isAuth = useAppSelector((store) => store.auth.isAuth)
	const [auth, setAuth] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setAuth(true)
		}
	})
	return (
		<nav className={styles.nav}>
			<div className={styles.logo}>
				<Image
					src={logo}
					alt="Logo fish"
					width={50}
					height={50}

				/>
				<div className={styles.logo_title}> Fishing Club</div>
			</div>
			<div className={styles.links}>
				{navigation.map(({ id, title, path }) =>
				(<Link
					className={pathname === path ? styles.active : undefined}
					key={id}
					href={path}
				>
					{title}
				</Link>)
				)}
				{auth
					?
					<Button text="Выйти" func={() => {
						dispatch(toggleIsAuth(false))
						localStorage.removeItem("token")
						router.reload()
					}} />
					:
					<Button text="Войти" func={() => dispatch(toggleModalStatus())} />
				}

			</div>
		</nav>

	)
}

export default Navbar