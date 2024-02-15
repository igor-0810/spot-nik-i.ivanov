import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
	interface Theme {
		status: {
			danger: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string
		}
	}
}

export const theme = createTheme({
	palette: {
		primary: {
			main: "#0073EA",
			light: "#F6FAFD",
			dark: "#0060B9",
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: "#E0C2FF",
			light: "#F5EBFF",
			// dark: will be calculated from palette.secondary.main,
			contrastText: "#47008F",
		},
	},
	status: {
		danger: "#B71106",
	},
})
