import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthenticated, load_user,import_csv } from '../actions/actions';

const Layout = ({children }) => {
    const dispatch= useDispatch()
    useEffect(() => {
        dispatch(import_csv())
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
