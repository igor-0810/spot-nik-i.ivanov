import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	overwrite: true,
	schema: [
		{
			"https://api.monday.com/v2": {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
				},
			},
		},
	],
	documents: ["src/**/*.{ts,tsx}"],
	generates: {
		"./src/__generated__/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				gqlTagName: "gql",
			},
		},
	},
	ignoreNoDocuments: true,
}

export default config
