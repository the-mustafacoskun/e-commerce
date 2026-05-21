import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../types/actionTypes";
import { api } from '../../api'
import { setFetchState } from "./productActions";
import md5 from "md5";

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (role) => ({ type: SET_ROLES, payload: role })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (lang) => ({ type: SET_LANGUAGE, payload: lang })


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
        api.post('/login', credantials)
            .then((response) => {
                const cleanEmail = response.data.email.trim().toLowerCase();
                const emailHash = md5(cleanEmail);
                response.data.avatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;
                if (rememberMe) {
                    localStorage.setItem('token', response.data.token);
                }
                dispatch(setUser(response.data));

                const { from } = location.state || { from: { pathname: "/" } }
                history.replace(from)
            }).catch((err) => {
                alert(err.response?.data?.message || 'E-mail or Passsword is wrong!');
            })
    }
}

export const verifyUser = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if(!token) {
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
            console.error('hata burada ',err)
        })

    }
}
