import { baseUrl } from '../../Utils/baseUrl'
import axios from "axios"


export const AddCoupanRqst = () => ({
    type: 'ADD_COUPAN_REQUEST',
});

export const AddCoupanSuccess = (Coupan) => ({
    type: 'ADD_COUPAN_SUCCESS',
    payload: Coupan
});

export const AddCoupanFailure = (error) => ({
    type: 'ADD_COUPAN_FAILURE',
    payload: error,
});

export const GetCoupanRqst = () => ({
    type: 'GET_COUPAN_REQUEST',
});

export const GetCoupanSuccess = (Coupan) => ({
    type: 'GET_COUPAN_SUCCESS',
    payload: { Coupan }
});

export const GetCoupanFailure = (error) => ({
    type: 'GET_COUPAN_FAILURE',
    payload: error,
});
export const DeleteCoupanRqst = () => ({
    type: 'DELETE_COUPAN_REQUEST',
});

export const DeleteCoupanSuccess = (Category) => ({
    type: 'DELETE_COUPAN_SUCCESS',
});

export const DeleteCoupanFailure = (error) => ({
    type: 'DELETE_COUPAN_FAILURE',
    payload: error,
});
export const GetaCoupanRqst = () => ({
    type: 'GETA_COUPAN_REQUEST',
});

export const GetaCoupanSuccess = (Coupan) => ({
    type: 'GETA_COUPAN_SUCCESS',
    payload: { Coupan }
});

export const GetaCoupanFailure = (error) => ({
    type: 'GETA_COUPAN_FAILURE',
    payload: error,
});
export const updateCoupanRqst = () => ({
    type: 'UPDATE_COUPAN_REQUEST',
});

export const updateCoupanSuccess = (Coupan) => ({
    type: 'UPDATE_COUPAN_SUCCESS',
    payload: { Coupan }
})

export const updateCoupanFailure = (error) => ({
    type: 'UPDATE_COUPAN_FAILURE',
    payload: error,
});

export const resetCoupanState = () => ({
    type: 'RESET_COUPAN_STATE',
})
export const addCoupan = (token, coupan) => async (dispatch) => {
    console.log(token, coupan);
    dispatch(AddCoupanRqst());
    try {
        const response = await axios.post(
            `${baseUrl}/coupan`,
            coupan,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response) {
            await dispatch(AddCoupanSuccess(response.data));
            setTimeout(() => {
                dispatch(resetCoupanState());
            }, 1000);
        }


    } catch (err) {
        console.log(err.response)
        dispatch(AddCoupanFailure(err.response.data));
        setTimeout(() => {
            dispatch(resetCoupanState());
        }, 1000);
        return err.response.data;
    }
};

export const getCoupan = (token) => async (dispatch) => {
     
    dispatch(GetCoupanRqst());
    try {
        const response = await axios.get(`${baseUrl}/coupan`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        if (response) {
            await dispatch(GetCoupanSuccess(response.data));
        }
    }
    catch (err) {
        dispatch(GetCoupanFailure(err.response.data));
        return err.response.data;
    }
}

export const deleteCoupan = (id, token) => async (dispatch) => {
    dispatch(DeleteCoupanRqst());
    console.log(id, token)
    try {
        const response = await axios.delete(`${baseUrl}/coupan/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            await dispatch(DeleteCoupanSuccess(response.data));
            setTimeout(() => {
                dispatch(resetCoupanState());
            }, 1000);
        }
    }
    catch (err) {
        dispatch(DeleteCoupanFailure(err.response.data));
        setTimeout(() => {
            dispatch(resetCoupanState());
        }, 1000);
        return err.response.data;
    }
}

export const getaCoupan = (id, token) => async (dispatch) => {
    console.log(id,token)
    dispatch(GetaCoupanRqst());
    try {
        const response = await axios.get(`${baseUrl}/coupan/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            await dispatch(GetaCoupanSuccess(response.data));
        }
    }
    catch (err) {
        dispatch(GetaCoupanFailure(err.response.data));
        return err.response.data;
    }
}

export const updateCoupan = (id, token, coupan) => async (dispatch) => {

    dispatch(updateCoupanRqst());
    try {
        const response = await axios.put(`${baseUrl}/coupan/${id}`, coupan , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            await dispatch(updateCoupanSuccess(response.data));
            setTimeout(() => {
                dispatch(resetCoupanState());
            }, 1000);
        }
    }
    catch (err) {
        dispatch(updateCoupanFailure(err.response.data));
        setTimeout(() => {
            dispatch(resetCoupanState());
        }, 1000);
        return err.response.data;
    }
}