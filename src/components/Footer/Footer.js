import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About the App */}
        <div className="footer-section">
          <h4>AAI Financials</h4>
          <p>
          Think carefully before securing other debts against your home. 
          Your home or property may be repossessed if you do not keep up repayments on your mortgage. 
          </p>
          <p>AAI Financials is a trading name of ANAYASD Limited which is registered in England & Wales No 09674951</p>
        </div>

        
        <div className="footer-section">
          <p>Anayasd limited works under Linear Financial Serviced (trading name is Linear Mortgage Network)</p>
          <p>Linear Mortgage Network Limited who are an Appointed Representative of PRIMIS Mortgage Network, a trading name of Advance Mortgage Funding Ltd.</p>
          <p>Advance Mortgage Funding Ltd is authorised and regulated by the Financial Conduct Authority.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
