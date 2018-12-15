const initialState = {
    data: 'test server',
    token: localStorage.getItem('token'),
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
        return(
                {
                    data: action.data,
                }
        )
        case 'LOGIN':
        return(
            {
                token: action.token,
            }
        )
        default:
        return(
            state
        )
    }
}

export default rootReducer;