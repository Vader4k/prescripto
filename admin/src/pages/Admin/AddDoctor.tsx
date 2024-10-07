import { assets } from "../../assets/assets";

const AddDoctor: React.FC = () => {
  return (
    <form className="w-full">
      <div className="w-full m-5">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>

        <div className="w-full flex flex-col gap-10 max-w-4xl px-8 py-8 bg-white border rounded max-h-[80vh] h-full overflow-y-scroll">
          <div className="flex items-center gap-3 mb-8 text-gray-800 ">
            <label htmlFor="doc-image">
              <img src={assets.upload_area} alt="upload_area" />
            </label>
            <input type="file" id="doc-image" hidden />
            <p>
              Upload Doctor <br /> Image
            </p>
          </div>
          <div>
            <label htmlFor="doc-name">Doctor Name</label>
            <input type="text" id="doc-name" required placeholder="Name" />
          </div>
          <div>
            <label htmlFor="doc-email">Doctor Email</label>
            <input type="email" id="doc-email" required placeholder="Email" />
          </div>
          <div>
            <label htmlFor="doc-password">Doctor Password</label>
            <input
              type="password"
              id="doc-password"
              required
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="doc-experience">Doctor Experience</label>
            <select
              defaultValue="1"
              name="doc-experience"
              id="doc-experience"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7 +</option>
            </select>
          </div>
          <div>
            <label htmlFor="doc-fees">Doctor Fees</label>
            <input type="number" id="doc-fees" required placeholder="Fees" />
          </div>
          <div>
            <div>
              <label htmlFor="doc-speciality">Speciality</label>
              <select
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
          </div>
          <div>
            <label htmlFor="doc-education">Doctor Education</label>
            <input
              type="text"
              id="doc-education"
              required
              placeholder="Education"
            />
          </div>
          <div>
            <label htmlFor="doc-address">Address</label>
            <input
              type="text"
              id="doc-address"
              required
              placeholder="Address 1"
            />
            <input
              type="text"
              id="doc-address"
              required
              placeholder="Address 2"
            />
          </div>
          <div>
            <label htmlFor="doc-about">About Doctor</label>
            <textarea
              id="doc-about"
              rows={5}
              required
              placeholder="Write About Doctor"
            />
          </div>
          <button>Add Doctor</button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
