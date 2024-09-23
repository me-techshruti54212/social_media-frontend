import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://social-media-backend-ou44.onrender.com", {
  withCredentials: true,
  transports: ['websocket']
});

function convertBase64ToImage(base64String) {
  // Remove any unnecessary metadata like "data:image/png;base64,"
  const cleanBase64 = base64String.split(",")[1];
const mimetype=base64String.split(",")[0].split(";")[0].split(":")[1]
  // Decode base64 string into a byte array

  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  // Convert byte characters to byte numbers (0-255)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Convert byte numbers into a byte array (Uint8Array)
  const byteArray = new Uint8Array(byteNumbers);

  // Create a blob from the byte array
  const blob = new Blob([byteArray],{ type: mimetype });

  // Generate an object URL from the blob
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
  // Create an image element and set the URL as the source
  // Append image to the body (or any other DOM element)
}
const Admin = () => {
  const [userdata, setUserData] = useState([]);
  useEffect(() => {
    async function getUserdata() {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getuserdata`).then(({ data }) => {
        if (data.success) {
          setUserData(data.userdata);
          console.log(data.userdata);
        }
      });
    }
    getUserdata();
    socket.on("newUser", (newUser) => {
      setUserData((prevData) => [...prevData, newUser]);
    });

    // Cleanup event listener on component unmount
    return () => {
      socket.off("newUser");
    };
  }, []);

  return (
    <>
    <h1 className="text-center mb-2">Admin Dashboard</h1>
      {userdata.map((oneuser, i) => {
        return (
          <div
            key={i}
            className="sm:flex border-2 px-4 py-3 rounded-lg justify-between "
          >
            <div className="flex items-center gap-4">
              <BsPersonFill size={25} />
              <div className="flex flex-col">
                <p className="text-black font-semibold text-lg">{oneuser.name}</p>

                <Link to={oneuser.handle} target="_blank" className="text-black ">{oneuser.handle}</Link>
              </div>
            </div>
           
              <div className="flex gap-8">
            {oneuser.images.map((img, i) => (
              <div key={i}>
              <a href={convertBase64ToImage(img)}  target="_blank" >
                <img src={convertBase64ToImage(img)} className="h-[100px] w-[100px]" />
                </a>
              </div>
            ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Admin;
