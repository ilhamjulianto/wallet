export const logIn = token => {
    return(dispatch) => {
        dispatch({
            type: 'LOGIN',
            token: token,
        })
    }
}

export const getData = data => {
    return(dispatch) => {
            dispatch({
                type: 'GET_DATA',
                data: data,
            })
        }
}