import { SET_ADDRESS_LIST, SET_CREDIT_CARDS, SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../types/actionTypes";
import { api } from '../../api'
import { setFetchState } from "./productActions";
import md5 from "md5";

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (role) => ({ type: SET_ROLES, payload: role })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (lang) => ({ type: SET_LANGUAGE, payload: lang })
export const setAddressList = (address) => ({ type: SET_ADDRESS_LIST, payload: address })
export const setCreditCards = (cardInfo) => ({ type: SET_CREDIT_CARDS, payload: cardInfo })


export const getRoles = () => {
    return (dispatch, getState) => {
        const state = getState();

        if (state.client.roles && state.client.roles.length > 0) {
            return;
        }
        dispatch(setFetchState('FETCHING'));
        api.get('/roles')
            .then((response) => {
                dispatch(setRoles(response.data));
                dispatch(setFetchState('FETCHED'));
            })
            .catch((err) => {
                console.error(err)
                dispatch(setFetchState('FAILED'));
            })

    }
}

export const loginUser = (credantials, rememberMe, location, history) => {
    return (dispatch) => {
        console.log("Thunk içine giren location:", location);

        console.log("Thunk içine giren history:", history);
        api.post('/login', credantials)
            .then((response) => {
                const cleanEmail = response.data.email.trim().toLowerCase();
                const emailHash = md5(cleanEmail);
                response.data.avatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;
                if (rememberMe) {
                    localStorage.setItem('token', response.data.token);
                }
                dispatch(setUser(response.data));



                const state = location.state || {};
                const redirectPath = state.from?.pathname || state.referrer || "/";
                history.replace(redirectPath)
            }).catch((err) => {
                alert(err.response?.data?.message || 'E-mail or Passsword is wrong!');
            })
    }
}

export const verifyUser = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(setUser({}));
        return;
    };
    api.defaults.headers.common['Authorization'] = token;
    api.get('/verify').then((response) => {
        const cleanEmail = response.data.email.trim().toLowerCase();
        const emailHash = md5(cleanEmail);
        response.data.avatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;
        dispatch(setUser(response.data));
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = response.data.token;

    }).catch((err) => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        dispatch(setUser({}))
        console.error(err)
    })

}



export const fetchUserAddress = (forceRefresh = false) => (dispatch, getState) => {
    const token = localStorage.getItem('token');
    const state = getState()
    if (!token) {
        return
    }
    if (!forceRefresh && state.client.addressList && state.client.addressList.length > 0) {
        return;
    }
    api.get('/user/address', { headers: { Authorization: token } }).then((response) =>
        dispatch(setAddressList(response.data))
    ).catch((err) => console.error(err))
}

export const postUserAddress = (data) => (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return
    }

    api.post('/user/address', data, { headers: { Authorization: token } }).then(() => {

        dispatch(fetchUserAddress(true));
    }

    ).catch((err) => console.error(err))
}
export const updateUserAddress = (data) => (dispatch) => {

    const token = localStorage.getItem('token');
    if (!token) return;

    api.put('/user/address', data, { headers: { Authorization: token } })
        .then(() => dispatch(fetchUserAddress(true)))
        .catch((err) => console.error(err))

}
export const deleteUserAddress = (addressId) => (dispatch) => {

    const token = localStorage.getItem('token');
    if (!token) return;

    api.delete(`/user/address/${addressId}`, { headers: { Authorization: token } })
        .then(() => dispatch(fetchUserAddress(true)))
        .catch((err) => console.error('Delete isteğinde hata oluştu', err))

}
export const fetchCreditCards = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.get('/user/card', { headers: { Authorization: token } }).then((response) =>
        dispatch(setCreditCards(response.data))
    ).catch((err) => console.error(err))
}

export const postCreditCard = (cardInfo) => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.post('/user/card', cardInfo, { headers: { Authorization: token } }).then(() => {

        dispatch(fetchCreditCards(true));
    }).catch((err) => console.error(err))


}
export const updateCreditCard = (cardInfo) => (dispatch) => {

    const token = localStorage.getItem('token');
    if (!token) return;

    api.put('/user/card', cardInfo, { headers: { Authorization: token } })
        .then(() => dispatch(fetchCreditCards(true)))
        .catch((err) => console.error(err))

}


export const deleteCreditCard = (cardId) => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    api.delete(`/user/card/${cardId}`, { headers: { Authorization: token } })
        .then(() => {

            dispatch(fetchCreditCards(true));
        })
        .catch((err) => console.error(err))
}



