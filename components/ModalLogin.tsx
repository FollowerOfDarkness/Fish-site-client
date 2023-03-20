import styles from '../styles/ModalLogin.module.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { IAuthData, IErrorLogin, login, setToken, toggleModalStatus, TTokenObj } from '../store/auth/authSlice'
import { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/router';

const ModalLogin = () => {
	const active = useAppSelector((state) => state.auth.statusModal)
	const token = useAppSelector((state) => state.auth.token)
	const dispatch = useAppDispatch()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const router = useRouter()

	const onFinish = async (values: IAuthData) => {
		await dispatch(login(values))
			.then((data: TTokenObj | IErrorLogin) => {
				if ("error" in data && data?.error) {
					onFinishFailed(data.error)
					console.log(data)
					alert(data.error.message)
					router.push('/')
					return
				}

				// localStorage.setItem("token", data.token)

				dispatch(toggleModalStatus())
				router.push('/users')

				// dispatch(setToken(data.token))
				// console.log("Promise onFinish", data)
			}

			)
			.catch((err) => {
				console.error(err)
			})
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	// const auth = () => {

	// }

	return (

		<div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => dispatch(toggleModalStatus())}>
			<div className={active ? `${styles.modal__content} ${styles.active}` : styles.modal__content} onClick={e => e.stopPropagation()}>

				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				// className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => dispatch(toggleModalStatus())}
				>
					<Form.Item
						label="Логин"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input /* onChange={(e) => setEmail(e.target.value)}  */ />
					</Form.Item>

					<Form.Item
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password /* onChange={(e) => setPassword(e.target.value)} */ />
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
						<Checkbox>Запомнить пароль</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button /* onClick={() => dispatch(toggleModalStatus())} */ type="primary" htmlType="submit">
							Войти
						</Button>
					</Form.Item>
				</Form>
				{/* <form className={styles.modal__form}>
					<label className={styles.modal__form_label}>
						Имя:
						<input className={styles.modal__form_input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>
						Пароль:
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>
					<input type="submit" onClick={() => auth()} value="Отправить" />
				</form> */}
			</div>
		</div >
	)
}

export default ModalLogin