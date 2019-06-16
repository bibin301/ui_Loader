import axios from '../Axios';
import URL from '../../asset/configUrl';
import actionType from '../../service/dashboard/actionType';

export const updateProfile = (profile) => dispatch => {
    const { personal_information, address } = profile
    axios.post(URL.PROFILE_EDIT, {
        personal_information, address
    })
        .then(res => {
            dispatch(getProfile(personal_information.email))
            dispatch({
                type: actionType.PROFILE_UPDATE_SUCCESS,
                payload: res.data
            })
        }).catch(error => {
            dispatch({
                type: actionType.PROFILE_UPDATE_FAILURE,
                error: error
            })
        })

}
export const getProfile = (email) => dispatch => {
    axios
    .get(URL.GET_PROFILE + email)
    .then(res=>{
        dispatch({
            type:actionType.GET_PROFILE_SUCCESS,
            payload:res.data
        })
    })
    .catch(error=>{
        dispatch({
            type:actionType.GET_PROFILE_FAILURE,
            error:error
        })

    })

}
export const changePassword =(data)=>dispatch=>{
    axios
    .post(URL.CHANGE_PASSWORD,data)
    .then(res=>{
        dispatch({
            type:actionType.CHANGE_PASSWORD_SUCCESS,
            payload:res.data
        })
    })
    .catch(error=>{
        dispatch({
            type:actionType.CHANGE_PASSWORD_FAILURE,
            error:error
        })
    })
}