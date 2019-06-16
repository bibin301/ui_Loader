import actionType from "../dashboard/actionType"

const initialState = {
    profileSuccessInfo: null,
    profileData: null,
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PROFILE_UPDATE_SUCCESS:

            return ({
                ...state,
                profileSuccessInfo: action.payload
            })
        case actionType.PROFILE_UPDATE_FAILURE:

            return {
                ...state,
                errors: action.errors.response
            }
        case actionType.GET_PROFILE_SUCCESS:
        console.log("action.payload",action.payload);
            return ({
                ...state,
                profileData: action.payload
            })
        case actionType.GET_PROFILE_FAILURE:
            return ({
                ...state,
                errors: action.errors
            })
        case actionType.CHANGE_PASSWORD_SUCCESS:
            return ({
                ...state,
            })
        case actionType.CHANGE_PASSWORD_FAILURE:
            return ({
                errors: action.errors
            })
        default:
            return state;
    }

}
export default dashboardReducer;