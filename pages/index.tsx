import Image from "next/image"
import styles from "../styles/Home.module.scss"
import fishFone from '../public/fish-general-fone.jpg'

const Home = () => {
	return (
		<div className={styles.wrapper}>
			<Image
				src={fishFone}
				alt="Logo fish"
			// width={}
			// height={}
			/>
			{/* <h1>Hello World</h1> */}
		</div>

	)
}

export default Home