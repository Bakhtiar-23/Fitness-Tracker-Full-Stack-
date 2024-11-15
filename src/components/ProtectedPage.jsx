import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/authService'; // Correct path

const ProtectedPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const protectedData = await getProtectedData();
      setData(protectedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedPage;
