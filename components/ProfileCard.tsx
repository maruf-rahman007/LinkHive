"use client"
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image'; // Import Next.js Image component
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileHeadlineAtom, profileImageAtom, profileNameAtom, usernameAtom } from '@/store/atoms/atoms';
import { UploadButton } from '@/app/utils/uploadthings';
const ProfileCard = () => {
  const session = useSession();
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);
  const [profileHeadline, setProfileHeadline] = useRecoilState(profileHeadlineAtom);
  const [usernameatom,setUsernameAtome] = useRecoilState(usernameAtom);

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/user', {
        username:usernameatom,
        title:profileHeadline,
        profilePicture:profileImage,
      });
      setProfileImage(response.data.updatedProfile.image);
      setProfileHeadline(response.data.updatedProfile.headline);
      setUsernameAtome(response.data.updatedProfile.username)
      console.log("response after post",response);
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
        <Image
          src={profileImage || '/placeholder.png'} // Placeholder image
          alt="Profile"
          width={68} // Size adjustments for Next.js Image
          height={68}
          className="rounded-full mr-4"
        />
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setProfileImage(res[0].appUrl);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      </div>
      <input
        type="text"
        value={usernameatom}
        onChange={(e) => setUsernameAtome(e.target.value)}
        placeholder={usernameatom}
        className="border p-2 rounded mb-4 w-full bg-white bg-opacity-80 focus:bg-white"
      />
      <input
        type="text"
        value={profileHeadline}
        onChange={(e) => setProfileHeadline(e.target.value)}
        placeholder={profileHeadline}
        className="border p-2 rounded mb-4 w-full bg-white bg-opacity-80 focus:bg-white"
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
