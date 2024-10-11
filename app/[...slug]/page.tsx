"use client"; // Mark this component as a Client Component
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CatchAllPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  // Handle both string and array cases
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Include the slugPath in the request to the backend
        const res = await axios.get(`/api/cardinfo?username=${slugPath}`);
        console.log("Backend response:", res);
        
        // Ensure the response data has the expected structure
        const { profile } = res.data;
        if (profile) {
           // Adjust based on your response structure
          setResponse(JSON.stringify(profile));
        } else {
          setError("No profile found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error while fetching data.");
      }
    };
  
    fetchData();
  }, [slugPath]);

  return (
    <div>
      <h1>Catch-All Route</h1>
      <p>URL segments: {slugPath}</p>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <pre>{response}</pre>
      )}
    </div>
  );
};

export default CatchAllPage;
