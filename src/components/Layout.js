import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthenticated, load_user} from '../actions/actions';

const Layout = ({children }) => {
    const dispatch= useDispatch()
    useEffect(() => {
        dispatch(checkAuthenticated());
        dispatch(load_user());
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
