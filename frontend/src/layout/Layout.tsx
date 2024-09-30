import Routing from "../router/Routing"
import Navbar from "../sections/Navbar"
import Footer from "../sections/Footer"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routing />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
