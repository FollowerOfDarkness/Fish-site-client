import styles from '../styles/ModalLogin.module.scss'

const ModalLogin = ({ active, setActive }) => {

	return (
		<div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
			<div className={styles.modal__content} onClick={e => e.stopPropagation()}></div>
		</div>
	)
}

export default ModalLogin