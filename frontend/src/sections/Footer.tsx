import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="">
      <div className="w-full max-w-[1400px] mx-auto p-4">
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-6 ">
            <img className="w-[150px]" src={assets.logo} alt="logo" />
            <p className="text-sm max-w-[600px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores minus tempore cum sed qui consequatur eaque quisquam
              aliquam beatae numquam.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Company</h2>
            <ul className="flex flex-col gap-4 text-sm font-extralight">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/contact">Contact us</a></li>
              <li><a href="/privacy-policy">Privacy policy</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h2>GET IN TOUCH</h2>
            <p>+1-212-456-7890</p>
            <p>kingdanny295@gmail.com</p>
          </div>
        </div>
        <hr className="w-full mt-6 bg-black border" />
        <div className="py-5 text-sm text-center">copyright-2024</div>
      </div>
    </footer>
  );
};

export default Footer;
