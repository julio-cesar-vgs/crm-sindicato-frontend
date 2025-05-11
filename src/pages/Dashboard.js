import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Card from "../components/Card";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    associados: 0,
    contribuicoes: 0,
    eventos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Placeholder data - replace with your API calls
        const associadosCount = 50;
        const contribuicoesCount = 120;
        const eventosCount = 15;

        setCounts({
          associados: associadosCount,
          contribuicoes: contribuicoesCount,
          eventos: eventosCount,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="cards-grid">
        <Card
          title="Associados"
          count={counts.associados}
          link="/associados" // Assuming this is your associados list route
        />
        <Card
          title="Contribuicoes"
          count={counts.contribuicoes}
          link="/contribuicoes" // Assuming this is your contribuicoes list route
        />
        <Card
          title="Eventos"
          count={counts.eventos}
          link="/eventos" // Assuming this is your eventos list route
        />
      </div>
    </div>
  );
};

export default Dashboard;