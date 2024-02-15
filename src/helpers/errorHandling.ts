const ERRORS_CATEGORIES = {
	VALIDATION: "validation",
	AUTHENTICATION: "authentication",
	BAD_REQUEST: "bad-request",
}

export const getMessage = error => {
	let message = "Sorry, something went wrong."

	const {
		graphQLErrors = null,
		message: graphMessage = null,
		// status = null
	} = error || {}

	message = graphMessage

	if (graphQLErrors && graphQLErrors.length > 0) {
		// iterate all GraphQL errors
		for (let i = 0; i < graphQLErrors.length; i += 1) {
			switch (graphQLErrors[i].extensions.category) {
				case ERRORS_CATEGORIES.AUTHENTICATION:
					message = graphMessage

					break
				case ERRORS_CATEGORIES.BAD_REQUEST:
					message = graphMessage

					break
				default:
					message = "Sorry, something went wrong."
					break
			}
		}
	}

	return message
}
