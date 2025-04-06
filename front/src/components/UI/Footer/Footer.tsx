import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Mi IoT - Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;