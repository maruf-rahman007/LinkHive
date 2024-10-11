// components/ProfileCard.tsx
"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ProfileCard = () => {
    const session = useSession();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // Placeholder for profile picture

  useEffect(()=> {
    const fetchData = async ()=> {
      try {
        const response = await axios.get('/api/user');
        console.log("Here is backend response : ",response)
        const { username, title, image } = response.data.session.user;
        console.log(image)
        
        setUsername(username || '');
        setTitle(title || '');
        setProfilePicture(image || '/placeholder.png');
      } catch (error) {
        throw new Error("Error While Fetching Data")
      }
    }
    fetchData();
  },[])

  const handleSave = async () => {
    // Logic to save changes
    try {
      const response = await axios.post('/api/user', {
        username,
        title,
        profilePicture,
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile.');
    }
  };
  return (
    <div className="mt-4 bg-white p-4 rounded-md shadow-md w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-4">Profile Card</h2>
      <div className="flex items-center mb-4">
        <img
          src={profilePicture || '/placeholder.png'} // Placeholder image
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
