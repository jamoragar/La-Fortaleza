import React from 'react';
import styled from 'styled-components';



const Header = () => {
    return (
        <MainContainer />
    ) 
}

export default Header;

const MainContainer = styled.header`
    background: url(../../../img/Header.jpg) no-repeat center/cover;
    height: 35rem;
   
     img {
      width: 30%;
      display: block;
      margin-left: auto;
      margin-right: auto
      
    }
`;


