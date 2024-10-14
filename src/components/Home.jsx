import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { TbLockFilled } from "react-icons/tb";
import { MdPermMedia } from "react-icons/md";
import axios from "axios";
import {toast} from "react-toastify";
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
const Home = () => {
    const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [image,setImage]=useState(null)
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [error, setError] = useState(null);
  const [errorFile,setErrorfile]=useState(null)
  const [filelength,setFilelength]=useState(0)
  const handleLogin=async(e)=>{
e.preventDefault()

if(errorFile) {
setError(errorFile);
return
  }
if(!handle || !name || !filelength)
{
  console.log(image)
    setError("Please enter all details")
    return;
}
else setError(null)
if (name.length < 3) {
    setError("Name must be at least 3 characters long");
      
    return;
  }
  else setError(null)
  if (handle.length < 10) {
    setError("Handle must be at least 10 characters long");
      
    return;
  }
else setError(null)
 console.log(image)
 console.log(name)
 console.log(handle)
    await axios.post(`https://social-media-backend-ou44.onrender.com/userdata`,{
      name:name,
      link:handle,
      image:image

    }).then(({data})=>
    {
      if(data.success)
      {
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    }
    )
setHandle("");
setImage(null)
setName("")
setFilelength(0)
  }

  const handleFileChange = async (e) => {
    setErrorfile(null);

    const files = e.target.files; // Access the file input
    if(files.length>2) {
        setErrorfile("You can't upload more than 2 images")
    setFilelength(files.length)

      return;
    }
    setFilelength(files.length)

    const base64Array = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Push each Base64 result into the array
      if (file.size > 35 * 1024) {
        setErrorfile("Images of size upto 35KB can only be uploaded");
        console.log(base64Array);
        return;
      }
    }
    for (let i = 0; i < files.length; i++) {
      const base64 = await getBase64(files[i]); // Wait for each conversion
      base64Array.push(base64);
    }
    // console.log(image)
    setImage(base64Array);
  };
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col gap-12 w-[85%] items-center ">
          <h2 className="font-semibold text-4xl text-center">Welcome !</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}  encType="multipart/form-data">
            <div className="flex items-center gap-6 border border-black rounded-2xl px-8 py-1 w-[100%] relative">
              <BsPersonFill
                size={32}
                className={`absolute bg-[#f5f5f5] transition duration-200 ${
                  name.length > 0 || toggle1 ? "transform -translate-y-7 -translate-x-1 scale-50" : ""
                }`}
              />
              <input
                type="text" name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="text-xl outline-none placeholder-black w-full bg-transparent py-1.5 px-2"
                onFocus={() => setToggle1(true)}
                onBlur={() => setToggle1(false)}
              />
              <label
                className={`font-semibold text-xl absolute left-20 transition duration-200 pointer-events-none bg-[#f5f5f5] ${
                 name.length > 0 || toggle1 ? "transform -translate-y-7 -translate-x-14 scale-75" : ""
                }`}
              >
                Name
              </label>
            </div>
            <div className="flex items-center gap-6 border border-black rounded-2xl px-8 py-1 relative">
              <TbLockFilled
                size={32}
                className={`absolute bg-[#f5f5f5] input-text transition duration-200 ${
                  handle.length > 0 || toggle2 ? "transform -translate-y-7 -translate-x-1 scale-50" : ""
                }`}
              />
              <input
                type="text"  name="link"
                onChange={(e) => setHandle(e.target.value)}
                value={handle}
                className="text-xl outline-none placeholder-black w-full bg-transparent py-1.5 px-2"
                onFocus={() => setToggle2(true)}
                onBlur={() => setToggle2(false)}
              />
              <label
                className={`font-semibold text-xl absolute left-20 transition duration-200 pointer-events-none bg-[#f5f5f5] ${
                  handle.length > 0 || toggle2 ? "transform -translate-y-7 -translate-x-14 scale-75" : ""
                }`}
              >
                User handle
              </label>
            </div>
            <div className="flex items-center gap-6 border border-black rounded-2xl px-8 py-1 relative">
              <MdPermMedia
                size={28}
                className={`absolute bg-[#f5f5f5] input-text transition duration-200 `}
              />
              <input
                type="file"  id="choose-img"  name="image"
                accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e)}
                className="text-xl outline-none placeholder-black w-full bg-transparent py-1.5 px-2 invisible " 
            
              />
              <label htmlFor="choose-img"
                className={`font-semibold text-xl absolute left-20 transition duration-200  bg-[#f5f5f5] `}
              >
               {filelength===0? "Choose Images": `${filelength} files chosen`}
              </label>
            </div>
       
            <button
              type="submit"
              className="font-semibold text-white px-10 py-2.5 bg-gradient-to-r from-[#01B6DA] to-[#4C35DE] rounded-2xl self-center"
            >
              Submit
            </button>
            
          </form>
        </div>
      </div>
      
 

    </>
      );
};

export default Home;
