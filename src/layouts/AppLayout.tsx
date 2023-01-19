import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header= styled(Box)`
	display: flex;
	height: 70px;
	margin-bottom: 50px;
`

const StyledLink = styled(Link)`
    cursor: pointer;
    padding: 10px 20px;
		text-decoration: none;
		color: #020100;
		margin-right: 20px;

    :hover {
        background-color: #020100;
        border-radius: 5px;
        color: white;
				font-weight: bold;
    }
`

function AppLayout({ children }: { children: JSX.Element }) {
	const headerItems = [
		{ name: "Home", link: "/" },
		{ name: "Transactions", link: "/transactions" },
		{ name: "Budgets", link: "/budgets" },
	];

	const handleLogOut = () => {
		localStorage.removeItem('open_banking_token');
		window.location.reload();
	}

	return (
		<Box sx={{ padding: "50px 100px" }}>
			<Header>
				<Box sx={{ display: "flex", alignItems: "center"  }} width={2/12}>
					<Typography fontSize={16}>Logo</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }} width={6/12}>
					{headerItems.map(({name, link}) => (
						<StyledLink to={link}>
							<Typography fontSize={16}>{name}</Typography>
						</StyledLink>
					))}
				</Box>
				<Box width={4/12} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<Box>
						<Typography fontSize={16}>Anthony Uche</Typography>
					</Box>
				</Box>
			</Header>

			<Box>
				{children}
			</Box>
		</Box>
	)
}

export default AppLayout;