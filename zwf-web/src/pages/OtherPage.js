
// import 'App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtherPage = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    history.push('/');
  });
  return null;
};

OtherPage.propTypes = {};

OtherPage.defaultProps = {};

export default OtherPage;
