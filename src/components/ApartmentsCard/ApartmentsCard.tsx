import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface ApartmentsCardProps {
  id: number;
}

const ApartmentsCard: React.FC<ApartmentsCardProps> = ({ id }) => {
  return (
    <article>
      <Link to={`/apartments/${id}`}>ApartmentsCard</Link>
    </article>
  );
};

export default memo(ApartmentsCard);
