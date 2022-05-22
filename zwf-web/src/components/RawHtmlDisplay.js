import React from 'react';
import styled from 'styled-components';

import DOMPurify from "dompurify";
import PropTypes from 'prop-types';


const ContainerStyled = styled.div`
  width: 100%;
  // padding: 1rem;
  // background-color: rgb(240, 242, 245);
  // border-radius: 4px;
  // border: 1px solid rgba(0,0,0,0.05);
  // color: rgba(0,0,0,0.65);
`;


export const RawHtmlDisplay = (props) => {

  return (
    <ContainerStyled
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.value) }} 
    />
  );
};

RawHtmlDisplay.propTypes = {
  value: PropTypes.string
};

RawHtmlDisplay.defaultProps = {
  value: ''
};

