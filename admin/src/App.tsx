import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAdminContext } from './hooks/useAllContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

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
      <div className='flex items-start gap-20 py-6 bg-[#F8F9FD]'>
        <Sidebar />
      </div>
    </>
  )

}

export default App