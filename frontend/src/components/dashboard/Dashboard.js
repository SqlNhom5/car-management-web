import React from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { formatPrice } from '../../utils/formatters';
import styled from 'styled-components';

// Styled components cho CSS
const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const PowerBIFrame = styled.iframe`
  width: 100%;
  height: 541.25px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    height: 450px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

// Nếu bạn muốn thêm stats hoặc chart sau này
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .stat-icon {
    color: #4a90e2;
    font-size: 24px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .stat-label {
    font-size: 14px;
    color: #666;
  }
`;

const ChartContainer = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  .recharts-wrapper {
    width: 100% !important;
    height: 400px !important;
  }

  .recharts-tooltip {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .recharts-tooltip p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }

  @media (max-width: 768px) {
    .recharts-wrapper {
      height: 300px !important;
    }
  }
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <PowerBIFrame
        title="hqtcsdl_phulee"
        src="https://app.powerbi.com/reportEmbed?reportId=a9348dd8-dc50-49ce-a186-5564a8b7c839&autoAuth=true&ctid=e7572e92-7aee-4713-a3c4-ba64888ad45f"
        allowFullScreen
      />
      {/* Nếu bạn muốn thêm stats hoặc chart, ví dụ: */}
      {/* <StatsGrid>
        <StatCard>
          <DollarSign className="stat-icon" />
          <div>
            <div className="stat-value">{formatPrice(123456)}</div>
            <div className="stat-label">Doanh thu</div>
          </div>
        </StatCard>
      </StatsGrid>
      <ChartContainer>
        <ResponsiveContainer>
          <BarChart data={yourData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip wrapperClassName="recharts-tooltip" />
            <Bar dataKey="value" fill="#4a90e2" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer> */}
    </DashboardContainer>
  );
};

export default Dashboard;