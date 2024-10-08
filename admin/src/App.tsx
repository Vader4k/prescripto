import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAdminContext } from './hooks/useAllContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Routing from './routes/Routing';

const App:React.FC = () => {

  const { aToken } = useAdminContext();
  
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
      <div className='flex items-start gap-5 bg-[#F8F9FD]'>
        <Sidebar />
        <div className='w-full'>
          <Routing />
        </div>
      </div>
    </>
  )

}

export default App