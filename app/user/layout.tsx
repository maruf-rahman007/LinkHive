'use client'

import {
  profileInfo,
  profileImageAtom,
  profileNameAtom,
  profileHeadlineAtom,
  profileAccountsAtom,
  usernameAtom,
} from "@/store/atoms/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserRoot({ children }: any) {
  const [profileData, setProfileData] = useRecoilState<any>(profileInfo);
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);
  const [profileName, setProfileName] = useRecoilState(profileNameAtom);
  const [profileHeadline, setProfileHeadline] = useRecoilState(profileHeadlineAtom);
  const [profileAccounts, setProfileAccounts] = useRecoilState(profileAccountsAtom);
  const [userName, setUsername] = useRecoilState<string>(usernameAtom)
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/add-url'); // Ensure this matches your backend endpoint
        const profile = response.data.profile;
        console.log("Here is the preview data :", profile);

        if (profile) {
          // Set individual profile states
          setProfileImage(profile.image || '/placeholder.svg');
          setProfileName(profile.name || 'Your Name');
          setProfileHeadline(profile.headline || 'Aspiring Software Engineer');
          setUsername(profile.username || 'User Name')
          setProfileAccounts(profile.accounts || []);
          setProfileData(profile); // Optional if you need the entire profile in one atom
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error while fetching data.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [setProfileData, setProfileImage, setProfileName, setProfileHeadline, setProfileAccounts]);

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main>
      {children}
    </main>
  );
}
