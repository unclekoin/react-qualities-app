import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import EditForm from '../components/ui/editForm';
import qualityService from '../services/quality.service';

const EditQualityPage = () => {
  const [quality, setQuality] = useState(null);
  const [errors, setErrors] = useState({message: '', status: ''});
  const { id } = useParams();

  const updateQuality = async (content) => {
    try {
      const data = await qualityService.update(id, content);
      return data.content;
    } catch (error) {
      const { message, status } = error.response.data;
      setErrors({ message, status });
      toast.error(`Error ${errors.status}: ${errors.message}`);
    }
  };

  const getQuality = async (id) => {
    try {
      const data = await qualityService.get(id);
      return data.content;

    } catch (error) {
      const { message, status } = error.response.data;
      setErrors({ message, status });
      toast.error(`Error ${errors.status}: ${errors.message}`);
    }
  };

  const handleSubmit = async (data) => {
    updateQuality(data);
  };

  useEffect(() => {
    getQuality(id).then((data) => setQuality(data));
  }, [id]);

  return (
    <>
      <h1>Edit Quality Page</h1>{' '}
      {quality ? (
        <EditForm data={quality} onSubmit={handleSubmit} />
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default EditQualityPage;
