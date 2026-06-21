import { useLocation, useNavigate } from 'react-router-dom';

export interface BackControl {
  canGoBack: boolean;
  goBack: () => void;
}

export const useBack = (): BackControl => {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    canGoBack: location.pathname !== '/',
    goBack: () => {
      if (location.key === 'default') navigate('/');
      else navigate(-1);
    },
  };
};
