"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileCard = () => {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // Placeholder for profile picture

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user');
        const { username, title, image } = response.data.session.user;
        setUsername(username || '');
        setTitle(title || '');
        setProfilePicture(image || '/placeholder.png');
      } catch (error) {
        throw new Error("Error While Fetching Data");
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
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
    <div className="min-h-screen p-4 rounded-md w-full md:w-1/2 bg-transparent">
      <div className='flex flex-col items-center'>
        <h2 className="text-xl font-bold mb-4">Set Profile Information</h2>
      </div>
      <div className="flex items-center mb-8 mt-8">
        <img
          src={profilePicture || '/placeholder.png'} // Placeholder image
          alt="Profile"
          className="w-17 h-17 rounded-full mr-4"
        />
        <button className="p-2 m-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-300">
          Change
        </button>
      </div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 rounded mb-4 w-full bg-white bg-opacity-80 focus:bg-white" // Semi-transparent white background
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded mb-4 w-full bg-white bg-opacity-80 focus:bg-white" // Semi-transparent white background
      />
      <button
        onClick={handleSave}
        className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-300"
      >
        Save
      </button>
    </div>
  );
};

export default ProfileCard;
