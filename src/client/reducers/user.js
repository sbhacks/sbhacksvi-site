import * as actionTypes from "../actionTypes";

const initialState = {
	isAuthenticated: false,
	applicationFields: null,
	info: null
};

const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.AUTH_SUCCESS: {
			let { applicationFields, info } = action;
			return { ...state, isAuthenticated: true, applicationFields, info };
		}
		case actionTypes.UPDATE_SUCCESS: {
			let { applicationFields } = action;
			return { ...state, applicationFields };
		}
		default:
			return state;
	}
};


module.exports = userReducer;