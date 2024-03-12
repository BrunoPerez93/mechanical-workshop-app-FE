import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const storedState = JSON.parse(localStorage.getItem('authState')) || initialState; 
  const [state, dispatch] = useReducer(authReducer, storedState);

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

export { AuthProvider, useAuth };