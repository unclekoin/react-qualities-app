import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditForm from '../components/ui/editForm';

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const { id } = useParams();
  const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;

  const handleSubmit = (data) => {
    axios
      .put(qualityEndPoint, data)
      .then((res) => console.log(res.data.content));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(qualityEndPoint);
      setQuality(data.content);
    };

    fetchData();
  }, [id, qualityEndPoint]);

  return (
    <>
      <h1>Edit Quality Page</h1>{' '}
      {quality ? <EditForm data={quality} onSubmit={handleSubmit} /> : <h3>Loading...</h3>}
    </>
  );
};

export default EditQualityPage;
