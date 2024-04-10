type RemoveTokenF = (token: string) => (subs: Topics) => Topics

const removeToken: RemoveTokenF = token => subs =>
	Object.keys(subs).reduce((acc, key) => {
		const { [token]: _ignore, ...rest } = subs[key]

		return {
			...acc,
			[key]: rest,
		}
	}, {})

export default removeToken
