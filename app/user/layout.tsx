'use client'

import { profileInfo } from "@/store/atoms/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";



export default function UserRoot({children}:any) {
    const [profileData, setProfileData] = useRecoilState<any>(profileInfo);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/add-url'); // Ensure this matches your backend endpoint
            const profile = response.data.profile;
            console.log("Here is the preview data :",profile)
            if (profile) {
              setProfileData(profile);
            } else {
              setError("No profile found.");
            }
          } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error while fetching data.");
          }
        };
    
        fetchData();
      }, []);

      return <main>
        {children}
      </main>
}