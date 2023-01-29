import React from 'react';
import styled from '@emotion/styled';
import { Box, Switch, Typography } from '@mui/material';
import { DollarSign } from 'components/icons';
// import UnlinkAccount from 'components/UnlinkAccount';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { currencyFormatter } from 'utilities';
import { Account as AccountType } from 'types';

const AccountCard = styled(Box)`
  height: auto;
  padding: 20px;
  background-color: white;
  margin-right: 40px;
  border-radius: 15px;
  display: flex;
  justify-content: 'space-between';

  :last-child {
    margin-right: 0;
  }
`;

// const ACCOUNT_TYPE_MAP: Record<string, string> = {
//   personal_banking: 'Personal banking',
//   savings_account: 'Savings account',
// };

interface AccountProps {
  key?: string;
  account: AccountType;
}

function Account({ account, ...props }: AccountProps) {
  // const history = useHistory();
  const [showAccountBalance, setShowAccountBalance] = useState(false);

  // const goToAccountTransactions = () => {
  //   history.push(`/transactions?account=${account.id}`);
  // };

  return (
    <AccountCard {...props} width={3 / 12}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} width={8 / 12}>
        <Box mb={3}>
          <Typography fontWeight={700} color="#020100">
            {account.institution.name}
          </Typography>
          <Typography color="#B6BCCE">{account.accountNumber}</Typography>
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
        width={4 / 12}
      >
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
        >
          <DollarSign color="white" size={16} />
        </Box>
      </Box>
      {/* <Box sx={{ width: "50px", bgcolor: "black", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} mr={5}>
        <DollarSign color='white' size={16} />
      </Box>
      <Box mr={10} sx={{ width: "200px" }}>
        <Typography fontWeight={700} fontSize={16}>{account.institution.name}</Typography>
        <Typography variant='body2' color="grey">{ACCOUNT_TYPE_MAP[String(account.institution.type).toLowerCase()]}</Typography>
      </Box>
      <Box mr={10} sx={{ width: "200px" }}>
        <Typography fontSize={16}>{account.accountNumber}</Typography>
        <Typography variant='body2' color="grey">{ACCOUNT_TYPE_MAP[String(account.type).toLowerCase()]}</Typography>
      </Box>
      <Box mr={10} sx={{ width: "200px" }}>
        <Typography fontWeight={700} fontSize={16}>{currencyFormatter(account.currency, account.balance)}</Typography>
      </Box>
      <Box display="flex">
        <Box mr={2} sx={{ cursor: "pointer" }}>
          <UnlinkAccount account={account} />
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={goToAccountTransactions}>
          <ArrowDown color='green' size={16} />
          <ArrowUp color='red' size={16} />
        </Box>
      </Box> */}
    </AccountCard>
  );
}

export default Account;
