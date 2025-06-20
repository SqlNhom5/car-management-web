import React from 'react';
import styled from 'styled-components';

// Styled components cho CSS
const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PowerBIFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

const Dashboard = () => {
  return (
    React.createElement(
      DashboardContainer,
      null,
      React.createElement(PowerBIFrame, {
        title: 'power_bi_web_car',
        src: 'https://app.powerbi.com/reportEmbed?reportId=4e316c1a-ffa3-411d-a309-39db2c93e4e3&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f',
        allowFullScreen: true,
      })
    )
  );
};

export default Dashboard;