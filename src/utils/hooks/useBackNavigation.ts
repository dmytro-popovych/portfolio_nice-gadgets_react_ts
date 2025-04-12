import { useCallback } from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';

interface LocationState {
  from?: string;
}

export const useBackNavigation = (fallbackPath: string = '/') => {
  const navigate = useNavigate();
  const location: Location<LocationState | null> = useLocation();
  const state = location.state;

  const handleBackClick = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(state?.from || fallbackPath, { replace: true });
    }
  }, [navigate, state, fallbackPath]);

  return handleBackClick;
};
