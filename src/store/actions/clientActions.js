import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../types/actionTypes";

export const setUser =(user)=> ({type:SET_USER,payload:user})
export const setRoles =(role)=> ({type:SET_ROLES,payload:role})
export const setTheme =(theme)=> ({type:SET_THEME,payload:theme})
export const setLanguage =(lang)=> ({type:SET_LANGUAGE,payload:lang})


