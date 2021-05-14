import React from 'react';
import styled from 'styled-components'

const Footer = () => {


    return (
        <FooterWrap>
            <div className="footer">Copyright&copy; 2021 BE SOPT Web part. All right Reserved</div>
        </FooterWrap>
    );
}

const FooterWrap = styled.div`
  .footer {
    height: 91px;
    color: #CEA0E3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Footer;