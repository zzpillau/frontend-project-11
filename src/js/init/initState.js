export const initState = {
  rssProcess: {
		state: 'initial', // initialized, validating, sending, success, error
		errors: [],
		input: '', // string to validate
		feedList: [], // storage 
	},
  validationState: {
    status: '', // valid, invalid
    error: [],
    success: '',
  }
}

