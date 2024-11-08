import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useWeb3 } from '../useContexts/Web3Context';
import Swal from 'sweetalert2';

function OnlyOfficialOrSecondary({ children }) {
    const { accounts, contract } = useWeb3();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [checkedAuthorization, setCheckedAuthorization] = useState(false);
    const Official = '0xadbACF186eB4cCda63F6BBa702138Ab607823fC7';
    const secondary = '0xd3b6De34023Cd30c85983c9BB97d8Ce29Cb2d0B4';

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                if (accounts[0] === Official || accounts[0] === secondary) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Error checking authorization:", error);
                setIsAuthorized(false);
            } finally {
                setCheckedAuthorization(true);
            }
        };

        if (contract && accounts.length > 0) {
            checkAuthorization();
        }
    }, [contract, accounts]);

    if (checkedAuthorization && !isAuthorized) {

        return <Navigate to="/notallow" />;
    }

    return isAuthorized ? children : null;
}

export default OnlyOfficialOrSecondary;
