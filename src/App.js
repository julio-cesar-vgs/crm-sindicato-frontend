// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/Home';

// import EventosList from './pages/Eventos/EventosList';
// import EventosDetail from './pages/Eventos/EventosDetail';
// import EventosForm from './pages/Eventos/EventosForm';
// import ParticipacoesList from './pages/Participacoes/ParticipacoesList';
// import ParticipacoesForm from './pages/Participacoes/ParticipacoesForm';
// import InteracoesList from './pages/Interacoes/InteracoesList';
// import InteracoesForm from './pages/Interacoes/InteracoesForm';
// import ContribuicoesList from './pages/Contribuicoes/ContribuicoesList';
// import ContribuicoesDetail from './pages/Contribuicoes/ContribuicoesDetail';
// import ContribuicoesForm from './pages/Contribuicoes/ContribuicoesForm';
// import NotFound from './pages/NotFound';
import './styles/layout.css';
import AssociadosDetail from "./pages/associados/AssociadosDetail";
import AssociadosList from "./pages/associados/AssociadosList";
import AssociadosForm from "./pages/associados/AssociadosForm"; // Importe seus estilos de layout (Grid/Flexbox)


function App() {
  return (
      <Router>
        <div className="app-container">
          <nav className="sidebar-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/associados">Associados</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/participacoes">Participações</Link></li>
              <li><Link to="/interacoes">Interações</Link></li>
              <li><Link to="/contribuicoes">Contribuições</Link></li>
            </ul>
          </nav>
          <main className="content-area">
            <Routes>
              {/*<Route path="/" element={<Home />} />*/}
              <Route path="/associados" element={<AssociadosList />} />
              <Route path="/associados/:id" element={<AssociadosDetail />} />
              <Route path="/associados/new" element={<AssociadosForm />} />
              <Route path="/associados/edit/:id" element={<AssociadosForm />} />

              {/*<Route path="/eventos" element={<EventosList />} />*/}
              {/*<Route path="/eventos/:id" element={<EventosDetail />} />*/}
              {/*<Route path="/eventos/new" element={<EventosForm />} />*/}
              {/*<Route path="/eventos/edit/:id" element={<EventosForm />} />*/}

              {/*<Route path="/participacoes" element={<ParticipacoesList />} />*/}
              {/*<Route path="/participacoes/new" element={<ParticipacoesForm />} />*/}
              {/* /!* Participacao não tem endpoint de detalhe ou edição individual no seu backend *!/*/}

              {/*<Route path="/interacoes" element={<InteracoesList />} />*/}
              {/*<Route path="/interacoes/new" element={<InteracoesForm />} />*/}
              {/* /!* Interacao não tem endpoint de detalhe ou edição individual no seu backend *!/*/}

              {/*<Route path="/contribuicoes" element={<ContribuicoesList />} />*/}
              {/*<Route path="/contribuicoes/:id" element={<ContribuicoesDetail />} />*/}
              {/*<Route path="/contribuicoes/new" element={<ContribuicoesForm />} />*/}
              {/*<Route path="/contribuicoes/edit/:id" element={<ContribuicoesForm />} />*/}

              {/*<Route path="*" element={<NotFound />} /> /!* Rota para página não encontrada *!/*/}
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;