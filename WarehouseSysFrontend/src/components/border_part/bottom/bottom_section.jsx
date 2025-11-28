// bottom_section.jsx
import React from 'react';
import { BottomContainer, Link } from './bottom_section.styled';

const BottomSection = () => {
  return (
    <BottomContainer>
      <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
      <p><Link href="/forgot-password">Forgot your password?</Link></p>
    </BottomContainer>
  );
};

export default BottomSection;