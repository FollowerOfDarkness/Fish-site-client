import Image from "next/image"
import styles from "../styles/Home.module.scss"
import fishFone from '../public/fish-general-fone.jpg'
import Navbar from "../components/Navbar"
import { Provider } from "react-redux"
import { store } from "../redux/store"
import ModalLogin from "../components/ModalLogin"
import Layout from "../components/Layout"

const Index = () => {
	return (
		<>
			{/* <div className={styles.wrapper}> */}

			<Image className={styles.image}
				src={fishFone}
				alt="Logo fish"
			// width={100}
			// height={100}
			/>
			{/* <h1>Hello World</h1> */}
			{/* </div> */}
			{/* <ModalLogin /> */}

		</>






	)
}

export default Index