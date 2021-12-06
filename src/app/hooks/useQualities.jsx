import React, { useContext } from 'react';

const QualitiesContext = React.createContext();

const qualities = [{ _id: '12345', name: 'abcde' }];

export const useQualities = () => {
  return useContext(QualitiesContext);
};


export const QualitiesProvider = ({ children }) => {
  return (
    <QualitiesContext.Provider value={qualities}>
      {children}
    </QualitiesContext.Provider>
  );
};
