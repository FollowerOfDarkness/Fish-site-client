import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../styles/Navbar.module.scss"
import logo from '../public/logo-fish.jpg'

const navigation = [
	{ id: 1, title: 'Главная', path: '/' },
	{ id: 2, title: 'Прогноз', path: '/posts' },
	{ id: 3, title: 'Отчеты', path: '/contacts' },
	{ id: 4, title: 'Личный кабинет', path: '/auth' },
]

const Navbar = () => {
	const { pathname } = useRouter()

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
			</div>
		</nav>

	)
}

export default Navbar