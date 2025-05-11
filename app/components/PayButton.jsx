import Link from "next/link";
import React from "react";
import styled from "styled-components";

const PayButton = ({ title, link }) => {
  return (
    <StyledWrapper className="hover:text-white">
      <Link
        className="btn hover:text-white text-[10px] md:text-[15px]"
        href={link}
      >
        {title}
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    text-align: center;
    line-height: 1.7;
    letter-spacing: 2px;
    width: 100%;
    display: inline-block;
    padding: 0.6rem 1.8rem;
    font-weight: 700;
    border: 3px solid #8b4513;
    cursor: pointer;
    position: relative;
    background-color: transparent;
    text-decoration: none;
    overflow: hidden;
    z-index: 1;
    font-family: inherit;
  }

  .btn::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #8b4513;
    transform: translateX(-100%);
    transition: all 0.3s;
    z-index: -1;
  }

  .btn:hover::before {
    transform: translateX(0);
  }
`;

export default PayButton;
