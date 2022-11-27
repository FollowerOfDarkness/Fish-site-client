import { MouseEventHandler } from "react"


const Button = ({ func, text }: { func?: () => void, text: string }) => {

	return (
		<button onClick={func ? func : undefined}>
			{text}
		</button>
	)
}

export default Button