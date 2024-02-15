import styled from "@emotion/styled"
import { Snackbar as MuiSnackbar } from "@mui/material"

export const StyledSnackbar = styled(MuiSnackbar)`
	.MuiSnackbarContent-root {
		background-color: ${({
			theme,
			// @ts-ignore
			type,
		}) => {
			let color = "null"
			switch (type) {
				case "success":
					color = "#4CAF50"
					break

				case "info":
					color = "#2196F3"
					break

				case "loading":
					color = "#2196F3"
					break

				case "warning":
					color = "#FFC107"
					break

				case "error":
					color = "#B71106"
					break

				default:
					color = "#2196F3"
					break
			}

			return color
		}};
	}
	.MuiSnackbarContent-message {
		max-width: 30rem;
	}
`

export const TypedContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.message-container {
		margin-left: 1rem;
	}
	svg {
		color: white;
	}
`

export const MessageContainer = styled.div`
	margin-left: 1rem;
`
