import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>

	)
}

export default Layout