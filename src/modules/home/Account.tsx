import React from 'react';
import styled from '@emotion/styled';
import { Box, Switch, Typography } from '@mui/material';
import { DollarSign } from 'components/icons';
import UnlinkAccount from 'components/UnlinkAccount';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { currencyFormatter } from 'utilities';
import { Account as AccountType } from 'types';

const AccountCard = styled(Box)`
  height: 150px;
  max-width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`;

// const ACCOUNT_TYPE_MAP: Record<string, string> = {
//   savings_account: 'Savings account',
//   investment_account: 'Investment account',
// };

function Account({ account }: { account: AccountType }) {
  const [showAccountBalance, setShowAccountBalance] = useState(false);

  return (
    <AccountCard>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        width={8 / 12}
      >
        <Box display="flex">
          <Box
            sx={{
              width: '50px',
              height: '50px',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
            }}
            mr={2}
          >
            <DollarSign color="white" size={16} />
          </Box>
          <Box>
            <Typography fontWeight={700} color="#020100">
              {account.institution.name}
            </Typography>
            <Typography color="#525c7a">{account.accountNumber}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography fontSize={20} fontWeight={700} mr={1}>
            {showAccountBalance
              ? currencyFormatter(account.balance, account.currency)
              : 'NGN ****'}
          </Typography>

          <Switch
            defaultChecked={false}
            value={showAccountBalance}
            onChange={() => setShowAccountBalance(!showAccountBalance)}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} width={4 / 12}>
        <UnlinkAccount account={account} />
      </Box>
    </AccountCard>
  );
}

export default Account;
