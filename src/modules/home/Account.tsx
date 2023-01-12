import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { ArrowUp, DollarSign, ArrowDown } from 'components/icons';
import UnlinkAccount from 'components/UnlinkAccount';
import { currencyFormatter } from 'utilities';

const AccountCard = styled(Box)`
width: 100%;
padding: 20px;
margin-bottom: 5px;
display: flex;
`

const ACCOUNT_TYPE_MAP: Record<string, string> = {
  'personal_banking': 'Personal banking',
  'savings_account': 'Savings account'
}

interface AccountProps {
  key?: string,
  account: any
}

function Account({ account, ...props }: AccountProps) {
  return (
    <AccountCard {...props}>
      <Box sx={{ width: "50px", bgcolor: "black", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} mr={5}>
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
        <Box>
          <ArrowDown color='green' size={16} />
          <ArrowUp color='red' size={16} />
        </Box>
      </Box>
    </AccountCard>
  )
}

export default Account;