import React from 'react';
import styled from '@emotion/styled';
import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AppLayoutContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  min-width: 1400px;
  width: 100%;
  background-color: #f3f4f7;
`;

const Header = styled(Box)`
  position: fixed;
  left: 0;
  width: 100%;
  display: flex;
  height: 70px;
  background-color: #f3f4f7;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const StyledTypography = styled(Typography)`
  padding: 10px 20px;
  margin-right: 20px;
  color: #525c7a;
  font-weight: 500;

  :hover {
    color: #020100;
  }
`;

function AppLayout({ children }: { children: JSX.Element }) {
  const headerItems = [
    { name: 'Home', link: '/' },
    { name: 'Transactions', link: '/transactions' },
    { name: 'Budgets', link: '/budgets' },
  ];

  const handleLogOut = () => {
    localStorage.removeItem('open_banking_token');
    window.location.reload();
  };

  return (
    <AppLayoutContainer px={10}>
      <Header px={10}>
        <Box sx={{ display: 'flex', alignItems: 'center' }} width={1 / 12}>
          <Typography>Logo</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }} width={7 / 12}>
          {headerItems.map(({ name, link }) => (
            <StyledLink to={link} key={link}>
              <StyledTypography>{name}</StyledTypography>
            </StyledLink>
          ))}
        </Box>
        <Box
          width={4 / 12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography fontWeight={500}>Anthony Uche</Typography>
          <Box mx={2} height={50}>
            <Divider orientation="vertical" />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleLogOut()}>
            <Typography fontWeight={500}>Logout</Typography>
          </Box>
        </Box>
      </Header>
      <Box pt={10}>{children}</Box>
    </AppLayoutContainer>
  );
}

export default AppLayout;
