import React from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  value: string | number;
  highlight?: boolean;
  icon?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  value, 
  highlight = false, 
  icon 
}) => {
  return (
    <div className={`info-card ${highlight ? 'highlight' : ''}`}>
      {icon && <div className="card-icon">{icon}</div>}
      <span className="card-title">{title}</span>
      <span className="card-value">{value}</span>
    </div>
  );
};

export default InfoCard;