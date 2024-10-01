import { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "King@gmail.com",
    phone: "+234 010 599 504",
    addreess: {
      line1: "65 richmond, cross",
      line2: "circle church road, england",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className="flex flex-col max-w-lg gap-2 text-sm">
      <img
        className="rounded-lg max-w-36"
        src={userData.image}
        alt={userData.name + "image"}
      />
      {isEdit ? (
        <input
          value={userData.name}
          className="px-4 py-1 my-4 font-medium bg-gray-100 border outline-none max-w-60"
          type="text"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="my-4 text-2xl font-medium">{userData.name}</p>
      )}
      <hr className="h-1 bg-zinc-500" />
      <div>
        <p className="mt-3 font-medium underline text-neutral-500">
          CONTACT INFORMATION
        </p>
        <div className="flex flex-col gap-3 mt-4 text-neutral-700">
          <div className="flex gap-8">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>
          </div>
          <div className="flex gap-8">
            <p className="font-medium">phone:</p>
            <p>
              {isEdit ? (
                <input
                  value={userData.phone}
                  type="text"
                  className="px-4 py-1 font-medium bg-gray-100 border outline-none max-w-60"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-500">{userData.phone}</p>
              )}
            </p>
          </div>
          <div className="flex gap-8">
            <p className={`font-medium ${isEdit ? 'mt-4': ''}`}>Address:</p>
            <p>
              {isEdit ? (
                <div className="grid mt-4">
                  <input
                    value={userData.addreess.line1}
                    className="px-4 py-1 font-medium bg-gray-100 border outline-none max-w-60"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        addreess: { ...prev.addreess, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    value={userData.addreess.line2}
                    className="px-4 py-1 my-4 font-medium bg-gray-100 border outline-none max-w-60"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        addreess: { ...prev.addreess, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <p>{userData.addreess.line1}</p>
                  <p>{userData.addreess.line2}</p>
                </div>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4 text-neutral-700">
          <p className="mt-3 font-medium underline text-neutral-500">
            BASIC INFORMATION
          </p>
          <div className="flex gap-8">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                className="bg-gray-300 max-w-20"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-blue-500">{userData.gender}</p>
            )}
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              value={userData.dob}
              className="p-2 bg-gray-100 rounded max-w-28"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button className="px-8 py-2 border rounded-full border-primary" onClick={() => setIsEdit(false)}>Save information</button>
        ) : (
          <button className="px-8 py-2 border rounded-full border-primary" onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
