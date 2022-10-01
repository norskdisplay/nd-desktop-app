import {
	AppBar,
	ThemeProvider,
	createTheme,
	Typography,
	Box,
	Toolbar,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Container
} from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	},
});

export const Layout = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = React.useState(false);

	const close = () => {
		setIsOpen(false);
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => setIsOpen(true)}
						>
							<MenuIcon />
						</IconButton>
						<img src="/logo.svg" style={{ display: "flex", height: "32px", marginRight: "16px" }} alt="Norsk Display logo" />
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Norsk Display
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ flexGrow: 1 }} padding="1">
				<Container style={{ paddingTop: "1em" }}>
					<Outlet />
				</Container>
			</Box>
			<Drawer
				anchor="left"
				open={isOpen}
				onClose={close}
			>
				<Box
					role="presentation"
					onClick={close}
					onKeyDown={close}
					style={{ width: "300px" }}
				>
					<List>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate("/")}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate("settings")}>
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
								<ListItemText primary="Configuration" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</ThemeProvider>
	);
}