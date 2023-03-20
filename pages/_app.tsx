import '../styles/globals.scss'
import styles from '../styles/Main.module.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import ModalLogin from '../components/ModalLogin'
import { useState } from 'react'
import { Provider } from "react-redux"
import { store } from "../store"


export default function App({ Component,
	pageProps }: AppProps) {
	const [modalActive, setModalActive] = useState(true)
	return (

		<Provider store={store}>
			<Layout>
				<div className={styles.main}>
					<Component {...pageProps} />
					<ModalLogin active={modalActive} setActive={setModalActive} />
				</div>
			</Layout>
		</Provider>




	)
}
