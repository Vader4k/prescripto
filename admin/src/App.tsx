import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAdminContext } from './hooks/useAllContext';
import Navbar from './components/Navbar';

const App:React.FC = () => {

  const { aToken } = useAdminContext();
  console.log(aToken)
  
  if (!aToken) {
    return (
      <div>
        <Login />
        <ToastContainer />
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
    </>
  )

}

export default App