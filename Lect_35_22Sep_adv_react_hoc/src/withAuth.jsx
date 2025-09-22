import { Navigate } from 'react-router-dom';

const withAuth = (Basecomponent) => { //higher order component

  return (props) => {
    const isToken = true;
    if (!isToken) {
      return <Navigate to="/login" />
    }
    return <Basecomponent {...props} />
  }
}

export default withAuth

// OR 
//with children
export const Protected = ({ children }) => { 

  const isToken = true;
  if (!isToken) {
    return <Navigate to="/login" />
  }
  return children

}
