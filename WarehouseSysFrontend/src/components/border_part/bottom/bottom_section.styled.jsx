// bottom_section.styled.jsx
import styled from 'styled-components';

export const BottomContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

export const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;