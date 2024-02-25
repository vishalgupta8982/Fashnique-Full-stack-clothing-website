import { baseUrl } from '../../Utils/baseUrl'
import axios from "axios"


export const AddBrandRqst = () => ({
    type: 'ADD_BRAND_REQUEST',
});

export const AddBrandSuccess = (brand) => ({
    type: 'ADD_BRAND_SUCCESS',
    payload: brand
});

export const AddBrandFailure = (error) => ({
    type: 'ADD_BRAND_FAILURE',
    payload: error,
});

export const GetBrandRqst = () => ({
    type: 'GET_BRAND_REQUEST',
});

export const GetBrandSuccess = (brand) => ({
    type: 'GET_BRAND_SUCCESS',
    payload: { brand }
});

export const GetBrandFailure = (error) => ({
    type: 'GET_BRAND_FAILURE',
    payload: error,
});
export const delteBrandRqst = () => ({
    type: 'DELETE_BRAND_REQUEST',
});

export const delteBrandSuccess = (Category) => ({
    type: 'DELETE_BRAND_SUCCESS',
});

export const delteBrandFailure = (error) => ({
    type: 'DELETE_BRAND_FAILURE',
    payload: error,
});
export const GetABrandRqst = () => ({
    type: 'GET_A_BRAND_REQUEST',
});

export const GetABrandSuccess = (brand) => ({
    type: 'GET_A_BRAND_SUCCESS',
    payload: { brand }
});

export const GetABrandFailure = (error) => ({
    type: 'GET_A_BRAND_FAILURE',
    payload: error,
});
export const updateBrandRqst = () => ({
    type: 'UPDATE_BRAND_REQUEST',
});

export const updateBrandSuccess = (Category) => ({
    type: 'UPDATE_BRAND_SUCCESS',
    payload: { Category }
})

export const updateBrandFailure = (error) => ({
    type: 'UPDATE_BRAND_FAILURE',
    payload: error,
});

export const resetBrandState = () => ({
    type: 'RESET_BRAND_STATE',
});


export const addBrand = (token, title) => async (dispatch) => {
    console.log(token,title)
    dispatch(AddBrandRqst());
    try {
        const response = await axios.post(
            `${baseUrl}/brand`,
            { title },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response) {
            await dispatch(AddBrandSuccess(response.data));
            setTimeout(() => {
                dispatch(resetBrandState());
            }, 1000);
        }


    } catch (err) {
        console.log(err.response.data)
        dispatch(AddBrandFailure(err.response.data));
        return err.response.data;
    }
};

export const getBrand = () => async (dispatch) => {
    dispatch(GetBrandRqst());
    try {
        const response = await axios.get(`${baseUrl}/brand`)
        if (response) {
            await dispatch(GetBrandSuccess(response.data));
        }
    }
    catch (err) {
        dispatch(GetBrandFailure(err.response.data));
        return err.response.data;
    }
}

export const deleteBrand = (id, token) => async (dispatch) => {
    dispatch(delteBrandRqst());
    console.log(id, token)
    try {
        const response = await axios.delete(`${baseUrl}/brand/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            await dispatch(delteBrandSuccess(response.data));
            setTimeout(() => {
                dispatch(resetBrandState());
            }, 1000);
        }
    }
    catch (err) {
        dispatch(delteBrandFailure(err.response.data));
        return err.response.data;
    }
}

export const getaBrand = (id, token) => async (dispatch) => {
    dispatch(GetABrandRqst());
    try {
        const response = await axios.get(`${baseUrl}/brand/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            await dispatch(GetABrandSuccess(response.data));
        }
    }
    catch (err) {
        dispatch(GetABrandFailure(err.response.data));
        return err.response.data;
    }
}

export const updateBrand = (id, token, title) => async (dispatch) => {

    dispatch(updateBrandRqst());
    try {
        const response = await axios.put(`${baseUrl}/brand/${id}`, { title }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response) {
            await dispatch(updateBrandSuccess(response.data));
            setTimeout(() => {
                dispatch(resetBrandState());
            }, 1000);
        }
    }
    catch (err) {
        dispatch(updateBrandFailure(err.response.data));
        return err.response.data;
    }
}


