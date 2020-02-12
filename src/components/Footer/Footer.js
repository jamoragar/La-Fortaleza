import React from 'react'
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
            <span style={{color: "black", top: "1.5rem", left: "1rem", position: "relative"}}>
                &copy;{new Date().getFullYear()} All Rights Reserved.
            </span>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.footer`
    background: #d3d3d3;
    height: 4rem;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;