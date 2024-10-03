import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import MyAppointment from "../pages/MyAppointment";
import ErrorPage from "../pages/Error";
import BookAppointment from "../pages/BookAppointment";
import ScrollToTop from "../components/ScrollToTop";

const Routing = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:speciality" element={<Doctors />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-appointments" element={<MyAppointment />} />
      <Route path="/book-appointment/:id" element={<BookAppointment />} />
      <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default Routing;
