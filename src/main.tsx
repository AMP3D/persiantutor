import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { bootstrap } from './bootstrap';
import App from './components/App/App.tsx';
import './styles/main.scss';

registerSW({ immediate: true });

const mount = (): void => {
  const root = document.getElementById('root');
  if (!root) return;
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
};

void bootstrap().finally(mount);
