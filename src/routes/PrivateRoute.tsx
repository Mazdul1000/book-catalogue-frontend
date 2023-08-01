import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

interface IProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: IProps) => {
    const { pathname } = useLocation()
    const {user, isLoading} = useAppSelector(state => state.user)

    if(isLoading){
        return <p>Loading...</p>
    }

    if(!user.email && !isLoading){
        return <Navigate to={'/login'} state={{path: pathname}}/>
    }
    return children
};

export default PrivateRoute;