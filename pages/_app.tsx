import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import ModalLogin from '../components/ModalLogin'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const [modalActive, setModalActive] = useState(true)
	return (
		<Layout>
			<button onClick={() => setModalActive(true)}>Button</button>
			<Component {...pageProps} />
			<ModalLogin active={modalActive} setActive={setModalActive} />
		</Layout>

	)
}
