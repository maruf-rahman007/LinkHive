// components/PreviewCard.tsx
"use client"

import { useSession } from "next-auth/react";

const PreviewCard = ({ username, title, profilePicture }:any) => {
    const session = useSession()
    return (
      <div className="mt-4 bg-white p-4 rounded-md shadow-md w-full md:w-1/4">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div className="flex items-center mb-4">
          <img
            src={session.data?.user?.image || '/placeholder.png'} // Placeholder image
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="font-bold">{username || 'User Name'}</p>
            <p className="text-gray-500">{title || 'Title'}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-2">
          <p>Links Area</p>
          {/* Render links here */}
        </div>
      </div>
    );
  };
  
  export default PreviewCard;
  