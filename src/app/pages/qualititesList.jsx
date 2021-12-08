import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQualities } from '../hooks/useQualities';
import QualitiesTable from '../components/ui/qualitiesTable';

const QualitiesListPage = () => {
  const history = useHistory();
  const { qualities, deleteQuality } = useQualities();

  const handleEdit = (param) => {
    history.push(`/edit/${param}`);
  };

  const handleDelete = (id) => {
    deleteQuality(id);
  };

  return (
    <>
      <h1>Qualities List Page</h1>
      <QualitiesTable
        onDelete={handleDelete}
        onEdit={handleEdit}
        data={qualities}
      />
    </>
  );
};

export default QualitiesListPage;
