import { assets } from "../../assets/assets";

const AddDoctor: React.FC = () => {
  return (
    <form className="w-full">
      <div className="w-full m-5">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>

        <div className="w-full max-w-4xl px-8 py-8 bg-white border rounded max-h-[80vh] h-full overflow-y-scroll">
          <div className="flex items-center gap-3 mb-8 text-gray-800 ">
            <label htmlFor="doc-image">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={assets.upload_area}
                alt="upload_area"
              />
            </label>
            <input type="file" id="doc-image" hidden />
            <p>
              Upload Doctor <br /> Image
            </p>
          </div>
          <div className="flex flex-col items-start gap-10 text-gray-600 lg:flex-row">
            <div className="flex flex-col flex-1 gap-5">
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-name">Doctor Name</label>
                <input className="w-full p-2 border outline-none" type="text" id="doc-name" required placeholder="Name" />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-email">Doctor Email</label>
                <input
                  className="w-full p-2 border outline-none"
                  type="email"
                  id="doc-email"
                  required
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-password">Doctor Password</label>
                <input
                  className="w-full p-2 border outline-none"
                  type="password"
                  id="doc-password"
                  required
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-experience">Doctor Experience</label>
                <select
                  defaultValue="1 year"
                  name="doc-experience"
                  id="doc-experience"
                  required
                  className="w-full max-w-[100px] p-2 border outline-none"
                >
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                  <option value="6 year">6 year</option>
                  <option value="7 year">7 year</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-fees">Doctor Fees</label>
                <input
                  type="number"
                  id="doc-fees"
                  required
                  placeholder="Fees"
                  className="w-full max-w-[100px] p-2 border outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-5">
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-speciality">Speciality</label>
                <select
                  className="w-full p-2 border outline-none"
                  defaultValue="general physician"
                  name="doc-experience"
                  id="doc-experience"
                  required
                >
                  <option value="general physician">General Physician</option>
                  <option value="gynecologist">Gynecologist</option>
                  <option value="pediatrician">Pediatrician</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="gastroenterologist">Gastroenterologist</option>
                  <option value="neurologist">Neurologist</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-education">Doctor Education</label>
                <input
                  type="text"
                  id="doc-education"
                  required
                  placeholder="Education"
                  className="w-full p-2 border outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="doc-address">Address</label>
                <input
                  type="text"
                  id="doc-address"
                  required
                  placeholder="Address 1"
                  className="w-full p-2 border outline-none"
                /> 
                <input
                  type="text"
                  id="doc-address"
                  required
                  placeholder="Address 2"
                  className="w-full p-2 border outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 my-5 text-sm">
            <label htmlFor="doc-about">About Doctor</label>
            <textarea
              id="doc-about"
              rows={5}
              required
              placeholder="Write About Doctor"
              className="w-full p-4 border outline-none"
            />
          </div>
          <button className="px-10 py-3 mt-4 text-white rounded-full bg-primary">Add Doctor</button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
