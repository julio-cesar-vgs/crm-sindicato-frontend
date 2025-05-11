// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/Home';

import Dashboard from './pages/Dashboard'; // Importe o componente Dashboard
// Importa os componentes de Interações do novo diretório
import InteracoesList from './pages/interacoes/InteracoesList';
import InteracoesForm from './pages/interacoes/InteracoesForm';

import ContribuicoesList from './pages/contribuicoes/ContribuicoesList';
import ContribuicoesDetail from './pages/contribuicoes/ContribuicoesDetail';
import ContribuicoesForm from './pages/contribuicoes/ContribuicoesForm';
import NotFound from './pages/NotFound/NotFound';
import './styles/layout.css';
import AssociadosDetail from "./pages/associados/AssociadosDetail"; 
import AssociadosList from "./pages/associados/AssociadosList";
import AssociadosForm from "./pages/associados/AssociadosForm";
import EventosList from "./pages/eventos/EventosList";
import EventosDetail from "./pages/eventos/EventosDetail";
import EventosForm from "./pages/eventos/EventosForm";
import ParticipacoesList from "./pages/participacao/ParticipacoesList";
import ParticipacoesForm from "./pages/participacao/ParticipacoesForm"; // Certifique-se que esta importação está correta



function App() {
  return (
      <Router>
        <div className="app-container">
          <nav className="sidebar-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/associados">Associados</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/participacao">Participações</Link></li>
              <li><Link to="/interacoes">Interações</Link></li>
              <li><Link to="/contribuicoes">Contribuições</Link></li>
            </ul>
          </nav>
          <main className="content-area">
            <Routes>
 <Route path="/" element={<Dashboard />} /> {/* Rota para o Dashboard */}
              <Route path="/associados" element={<AssociadosList />} />
              <Route path="/associados/:id" element={<AssociadosDetail />} />
              <Route path="/associados/new" element={<AssociadosForm />} />
              <Route path="/associados/edit/:id" element={<AssociadosForm />} />

              <Route path="/eventos" element={<EventosList />} />
              <Route path="/eventos/:id" element={<EventosDetail />} />
              <Route path="/eventos/new" element={<EventosForm />} />
              <Route path="/eventos/edit/:id" element={<EventosForm />} />

              <Route path="/participacao" element={<ParticipacoesList />} />
              <Route path="/participacao/new" element={<ParticipacoesForm />} />
               {/* Participacao não tem endpoint de detalhe ou edição individual no seu backend */}

              <Route path="/interacoes" element={<InteracoesList />} />
              {/* Remove ou comenta a rota antiga que importava de Interacoes/interacoes.js se existir */}
              <Route path="/interacoes/new" element={<InteracoesForm />} />
              {/* /* Interacao não tem endpoint de detalhe ou edição individual no seu backend */}
              
              <Route path="/contribuicoes" element={<ContribuicoesList />} />
              <Route path="/contribuicoes/:id" element={<ContribuicoesDetail />} />
              <Route path="/contribuicoes/new" element={<ContribuicoesForm />} />
              <Route path="/contribuicoes/edit/:id" element={<ContribuicoesForm />} />
              
              <Route path="*" element={<NotFound />} /> {/* Rota para página não encontrada */}
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;