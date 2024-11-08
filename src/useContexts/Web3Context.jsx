import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { ethers } from 'ethers';
import abi from '../assets/abi.json';
import Swal from 'sweetalert2';



const [metaMask, hooks] = initializeConnector((actions) => new MetaMask({ actions }));
const { useChainId, useAccounts, useIsActive, useProvider } = hooks;

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const chainId = useChainId();
    const accounts = useAccounts();
    const isActive = useIsActive();
    const provider = useProvider();
    const [error, setError] = useState(undefined);
    const [contract, setContract] = useState(null);
    const [votingState, setVotingState] = useState(null);

    useEffect(() => {
        connectMetaMask();
    }, []);

    useEffect(() => {
        setUpContract();
    }, [provider, isActive]);

    useEffect(() => {
        if (contract) {
            const fetchVotingState = async () => {
                try {
                    const state = await contract.state();

                    let stateText = '';
                    switch (state.toString()) {
                        case '0':
                            stateText = 'Created';
                            break;
                        case '1':
                            stateText = 'Voting';
                            break;
                        case '2':
                            stateText = 'Ended';
                            break;
                        default:
                            stateText = 'Unknown';
                    }

                    setVotingState(stateText); // เก็บค่าที่แปลงแล้วใน votingState
                } catch (err) {
                    console.error("Error fetching voting state:", err);
                }
            };
            fetchVotingState();
        }
    }, [contract]);


    const setUpContract = () => {
        if (provider && isActive) {
            const contractAddress = '0x20F079704a7fcAFbA397dc3Dc86Ee3BBC1819033';
            const signer = provider.getSigner();
            const votingContract = new ethers.Contract(contractAddress, abi, signer);
            setContract(votingContract);
        }
    };

    const connectMetaMask = async () => {
        try {
            await metaMask.connectEagerly(); // หรือการเชื่อมต่อ MetaMask แบบ eager
            console.debug('Successfully connected to MetaMask');
        } catch (error) {
            console.debug('Failed to connect eagerly to MetaMask');

        }
    };


    const handleConnect = async () => {
        try {
            await metaMask.activate();
            Swal.fire({
                title: 'เชื่อมต่อสำเร็จ!',
                text: 'เชื่อมต่อกับ MetaMask แล้ว!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error activating MetaMask', error);
            setError(error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถเชื่อมต่อกับ MetaMask ได้',
                icon: 'error',
                confirmButtonText: 'ลองใหม่'
            });
        }
    };

    const handleDisconnect = () => {
        try {
            metaMask.resetState();

            Swal.fire({
                title: 'ตัดการเชื่อมต่อสำเร็จ!',
                text: 'ตัดการเชื่อมต่อกับ MetaMask แล้ว!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error disconnecting MetaMask', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถตัดการเชื่อมต่อกับ MetaMask ได้',
                icon: 'error',
                confirmButtonText: 'ลองใหม่'
            });
        }
    };

    return (
        <Web3Context.Provider value={{
            contract,
            votingState,
            chainId,
            accounts,
            isActive,
            provider,
            error,
            handleConnect,
            handleDisconnect,
        }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
