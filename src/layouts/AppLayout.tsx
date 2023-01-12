import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SideNav = styled(Box)`
    position: fixed;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 350px;
    padding: 0 50px;
`

const LinkContainer = styled(Box)`
    cursor: pointer;
    padding: 10px 0px;

    :hover {
        padding: 10px 5px;
        background-color: black;
        border-radius: 5px;
        color: white;
    }
`

function AppLayout({ children }: { children: JSX.Element }) {
	const sideNavLinks = [
		{ name: "Home", link: "/" },
		{ name: "Transactions", link: "/transactions" },
	];

	const handleLogOut = () => {
		localStorage.removeItem('open_banking_token');
		window.location.reload();
	}

	return (
		<Box display="flex">
			<SideNav display="flex" flexDirection="column">
				<Box mt="50px" height="100px" display="flex" alignItems="center" borderBottom="1px solid black">
					<h1 style={{ margin: "0" }}>Openbank</h1>
				</Box>
				<Box pt="100px" height="calc(100vh - 50px - 100px - 100px)">
					{sideNavLinks.map(({ name, link }) => (
						<Link to={link} style={{ textDecoration: 'none', color: 'currentcolor' }} key={name}>
							<LinkContainer mb="20px">
								<Typography variant="body1" fontSize="20px">{name}</Typography>
							</LinkContainer>
						</Link>
					))}
				</Box>
				<Box height="100px" borderTop="1px solid black" display="flex" alignItems="center">
					<LinkContainer width="100%" onClick={() => handleLogOut()}>
						<Typography variant="body1" fontSize="20px">Log out</Typography>
					</LinkContainer>
				</Box>
			</SideNav>

			<Box ml="400px" position="fixed" width="calc(100% - 400px)" px="50px">
				<Box height="100px" mt="50px" display="flex" alignItems="center" pr="50px" borderBottom="1px solid black">
					<Box>Header</Box>
				</Box>
				<Box mt="100px">
					{children}
				</Box>
			</Box>

		</Box>
	)
}

export default AppLayout;