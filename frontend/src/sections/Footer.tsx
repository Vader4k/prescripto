import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="w-full max-w-[1400px] mx-auto p-4 md:px-10">
        <div className="flex flex-col items-start justify-between w-full gap-6 md:flex-row">
          <div className="flex flex-col gap-6 ">
            <img className="w-[180px]" src={assets.logo} alt="logo" />
            <p className="text-sm max-w-[400px] lg:max-w-[600px] leading-7">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
              fuga culpa quasi sunt soluta molestiae cum officia neque debitis
              labore voluptatum at quae, aspernatur id fugit suscipit delectus
              optio minima architecto alias qui autem inventore. Iusto ipsa
              blanditiis temporibus harum.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-medium uppercase">Company</h2>
            <ul className="flex flex-col gap-4 pl-2 text-sm font-extralight">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-medium uppercase">Get in touch</h2>
            <p>+1-212-456-7890</p>
            <p>kingdanny295@gmail.com</p>
          </div>
        </div>
        <hr className="w-full mt-6 bg-black border" />
        <div className="py-5 text-sm text-center">
          copyright-2024 - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
