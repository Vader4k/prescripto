import Routing from "../router/Routing"
import Navbar from "../sections/Navbar"
import Footer from "../sections/Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <main>
        <Routing />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
