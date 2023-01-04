import styled from '@emotion/styled';
import { Alert, AlertTitle, Snackbar, Box } from '@mui/material';
import API from 'api';
import { useQuery } from 'react-query';

const AccountCard = styled(Box)`
    background-color: red;
    width: 350px;
    padding: 20px;
    border-radius: 5px;
    color: white;
`

function Home() {
    const { data, isError } = useQuery('accounts', () => {
        return API.get('accounts');
    }, {
        select: ({ data }) => data
    })

    return (
        <Box sx={{ padding: "0 20px" }}>
            <Snackbar 
				open={isError}
				autoHideDuration={6000} 
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert severity='error'>
					<AlertTitle>Could not fetch accounts</AlertTitle>
				</Alert>
			</Snackbar>

            <h1>Accounts</h1>

            {(data||[]).map((account: any) => (
                <AccountCard key={account.accountNumber}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <p>Name:</p>
                        <p>{account.name}</p>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <p>Bank:</p>
                        <p>{account.institution.name}</p>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <p>Account Number:</p>
                        <p>{account.accountNumber}</p>
                    </Box>
                </AccountCard>
            ))}
        </Box>
    )
}

export default Home;