import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import qualityService from '../services/quality.service';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (error) {
        const { message, status } = error.response.data;
        setErrors({ message, status });
        toast.error(`Error ${errors.status}: ${errors.message}`);
      }
    };
    getQualities();
  }, [errors]);

  const getQuality = (id) => {
    return qualities.find((quality) => quality._id === id);
  };

  const updateQuality = async ({ _id, ...data }) => {
    try {
      const { content } = await qualityService.update(_id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) return content;
          return item;
        })
      );
      return content;
    } catch (error) {
      const { message, status } = error.response.data;
      setErrors({ message, status });
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (error) {
      const { message, status } = error.response.data;
      setErrors({ message, status });
    }
  };

  return (
    <QualitiesContext.Provider
      value={{ qualities, getQuality, updateQuality, addQuality }}
    >
      {!isLoading ? children : <h3>Loading...</h3>}
    </QualitiesContext.Provider>
  );
};
