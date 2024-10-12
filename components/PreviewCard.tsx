// components/PreviewCard.tsx
"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const PreviewCard = () => {
  const session = useSession();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  
  useEffect(()=> {
    const fetchData = async ()=> {
      try {
        const response = await axios.get('/api/add-url');
        console.log("Here is backend response for Preview: ",response)
        setName(response.data.profile.name)
        setTitle(response.data.profile.headline)
        setProfilePicture(response.data.profile.image)
      } catch (error) {
        throw new Error("Error While Fetching Data")
      }
    }
    fetchData();
  },[])

  return (
      <div className="relative bg-white p-4 rounded-[30px] shadow-lg w-[300px] h-[600px] border-8 border-gray-300">
        {/* iPhone notch simulation */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gray-400 rounded-full"></div>
        
        <h2 className="text-lg font-bold text-center mt-4 mb-4">Preview</h2>
        
        <div className="flex flex-col items-center mb-4">
          <img
            src={profilePicture|| profilePicture || '/placeholder.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-4"
          />
        </div>
        
        <div className="flex flex-col items-center text-center">
          <p className="font-bold text-md">{name || 'User Name'}</p>
          <p className="text-gray-500 text-sm">{title || 'Title'}</p>
        </div>

        <div className="border-t border-gray-300 pt-4 mt-6 w-full text-center">
          <p>Links Area</p>
          {/* Render links here */}
        </div>
      </div>
  );
};

export default PreviewCard;
