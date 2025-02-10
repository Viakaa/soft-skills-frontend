import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BelbinResult = () => {
  const { userId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = getToken();

        if (!token) throw new Error("No authentication token found.");

        const response = await fetch(
          `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}/tests/belbin/results`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch results.");

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId]);

  if (loading) return <div>Loading results...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Belbin Test Results</h2>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default BelbinResult;
