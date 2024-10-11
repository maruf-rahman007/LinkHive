// components/ProfileCard.tsx
"use client"
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ProfileCard = () => {
    const session = useSession();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // Placeholder for profile picture

  const handleSave = () => {
    // Logic to save changes can be implemented here
  };
  
  return (
    <div className="mt-4 bg-white p-4 rounded-md shadow-md w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-4">Profile Card</h2>
      <div className="flex items-center mb-4">
        <img
          src={session.data?.user?.image || '/placeholder.png'} // Placeholder image
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Change
        </button>
      </div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 rounded mb-4 w-full"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded mb-4 w-full"
      />
      <button
        onClick={handleSave}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default ProfileCard;
