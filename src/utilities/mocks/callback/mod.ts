export default function callback<Args>() {
	type State = {
		argsHistory: Args[]
		executionTimes: number
	}

	const state: State = {
		argsHistory: [],
		executionTimes: 0,
	}

	const callback = (args: Args): void => {
		state.argsHistory.push(args)
		state.executionTimes++
	}

	callback.state = state

	return callback
}
