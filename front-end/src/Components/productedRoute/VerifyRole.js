import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { RoleContext } from './RoleContaxt';



const VerifyRole = ({ children, allowedRoles }) => {
    const { isLoggedIn, role } = useContext(RoleContext);
    console.log(role)
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
       
        return <Navigate to={'/error'}/> ;
    }

    return children;
};

export default VerifyRole;
