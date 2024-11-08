import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../useContexts/Web3Context';
import Swal from 'sweetalert2';
import VotingControl from '../components/VotingControl';
import CandidateManagement from '../components/CandidateManagement';
import SecondaryOfficial from '../components/SecondaryOfficial';

const OfficialPage = () => {
    const { contract, provider, votingState } = useWeb3();
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState('');
    const [candidateToRemove, setCandidateToRemove] = useState('');
    const [candidateToUpdate, setCandidateToUpdate] = useState('');
    const [updatedCandidateName, setUpdatedCandidateName] = useState('');
    const [secondaryOfficial, setSecondaryOfficial] = useState('');
    const [swap, setSwap] = useState(false);

    useEffect(() => {
        if (contract) {
            const fetchData = async () => {
                try {
                    const candidateList = await contract.getCandidateList();
                    setCandidates(candidateList);
                } catch (err) {
                    console.error('Error fetching candidate list:', err);
                }
            };
            fetchData();
        }
    }, [contract, swap]);

    const startVoting = async () => {
        try {
            const tx = await contract.startVote();
            const loadingSwal = Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่ ขณะกำลังเริ่มการโหวต',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'การโหวตเริ่มต้นแล้ว',
                        text: 'ระบบเริ่มการโหวตสำเร็จ'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถเริ่มการโหวตได้',
                        text: 'เกิดข้อผิดพลาดในการเริ่มการโหวต'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเริ่มการโหวตได้',
                text: 'ต้องการสถานะยังไม่เปิดโหวต หรือ เกิดข้อผิดพลาดในการเริ่มการโหวต'
            });
        }
    };

    const endVoting = async () => {
        try {
            const tx = await contract.endVote();
            const loadingSwal = Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่ ขณะกำลังสิ้นสุดการโหวต',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'การโหวตสิ้นสุดแล้ว',
                        text: 'ระบบสิ้นสุดการโหวตสำเร็จ'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถสิ้นสุดการโหวตได้',
                        text: 'เกิดข้อผิดพลาดในการสิ้นสุดการโหวต'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถสิ้นสุดการโหวตได้',
                text: 'ต้องการสถานะอยู่ในการโหวต หรือ เกิดข้อผิดพลาดในการสิ้นสุดการโหวต'
            });
        }
    };

    const resetVoting = async () => {
        try {
            const tx = await contract.resetVoting();
            const loadingSwal = Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่ ขณะกำลังรีเซ็ตระบบ',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    Swal.fire({
                        icon: 'info',
                        title: 'ระบบรีเซ็ตเสร็จสิ้น',
                        text: 'ระบบการโหวตถูกรีเซ็ตแล้วและพร้อมใช้งานใหม่'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถรีเซ็ตระบบได้',
                        text: 'เกิดข้อผิดพลาดในการรีเซ็ตระบบ'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถรีเซ็ตระบบได้',
                text: 'ต้องการสถานะสิ้นสุดการโหวต หรือ เกิดข้อผิดพลาดในการรีเซ็ตระบบ'
            });
        }
    };

    const addCandidate = async () => {
        if (!newCandidate) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกชื่อผู้สมัคร',
                text: 'โปรดกรอกชื่อผู้สมัครใหม่ที่ต้องการเพิ่ม'
            });
            return;
        }
        try {
            const tx = await contract.addCandidate(newCandidate);
            const loadingSwal = Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่ ขณะกำลังเพิ่มผู้สมัคร',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    setSwap(!swap);
                    setNewCandidate('');
                    Swal.fire({
                        icon: 'success',
                        title: 'เพิ่มผู้สมัครสำเร็จ',
                        text: `เพิ่มผู้สมัคร ${newCandidate} สำเร็จ`
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถเพิ่มผู้สมัครได้',
                        text: 'เกิดข้อผิดพลาดในการเพิ่มผู้สมัคร'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเพิ่มผู้สมัครได้',
                text: 'เกิดข้อผิดพลาดในการเพิ่มผู้สมัคร'
            });
        }
    };

    const removeCandidate = async () => {
        if (!candidateToRemove) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกชื่อผู้สมัครที่จะลบ',
                text: 'โปรดกรอกชื่อผู้สมัครที่ต้องการลบ'
            });
            return;
        }

        const loadingSwal = Swal.fire({
            title: 'กำลังดำเนินการ...',
            text: 'กรุณารอสักครู่ ขณะกำลังลบผู้สมัคร',
            icon: 'info',
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const tx = await contract.removeCandidate(candidateToRemove);
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    setSwap(!swap);
                    setCandidateToRemove('');
                    Swal.fire({
                        icon: 'success',
                        title: 'ลบผู้สมัครสำเร็จ',
                        text: `ลบผู้สมัคร ${candidateToRemove} สำเร็จ`
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถลบผู้สมัครได้',
                        text: 'เกิดข้อผิดพลาดในการลบผู้สมัคร'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            loadingSwal.close();
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถลบผู้สมัครได้',
                text: 'เกิดข้อผิดพลาดในการลบผู้สมัคร'
            });
        }
    };

    const updateCandidate = async () => {
        if (!candidateToUpdate || !updatedCandidateName) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบ',
                text: 'โปรดกรอกชื่อผู้สมัครเดิมและชื่อผู้สมัครใหม่'
            });
            return;
        }
        try {
            const tx = await contract.updateCandidate(candidateToUpdate, updatedCandidateName);
            const loadingSwal = Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่ ขณะกำลังแก้ไขชื่อผู้สมัคร',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    setSwap(!swap);
                    setCandidateToUpdate('');
                    setUpdatedCandidateName('');
                    Swal.fire({
                        icon: 'success',
                        title: 'แก้ไขชื่อผู้สมัครสำเร็จ',
                        text: `แก้ไขชื่อผู้สมัครจาก ${candidateToUpdate} เป็น ${updatedCandidateName}`
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถแก้ไขชื่อผู้สมัครได้',
                        text: 'เกิดข้อผิดพลาดในการแก้ไขชื่อผู้สมัคร'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถแก้ไขชื่อผู้สมัครได้',
                text: 'เกิดข้อผิดพลาดในการแก้ไขชื่อผู้สมัคร'
            });
        }
    };

    const setSecondary = async () => {
        if (!secondaryOfficial) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกที่อยู่ของผู้ดูแลระบบสำรอง',
                text: 'โปรดกรอกที่อยู่ของผู้ดูแลระบบสำรอง'
            });
            return;
        }
        try {
            const tx = await contract.setSecondaryOfficial(secondaryOfficial);
            const loadingSwal = Swal.fire({
                title: 'กำลังดำเนินการ...',
                text: 'กรุณารอสักครู่ ขณะกำลังตั้งผู้ดูแลระบบสำรอง',
                icon: 'info',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            provider.once(tx.hash, (receipt) => {
                loadingSwal.close();
                if (receipt && receipt.status === 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'ตั้งผู้ดูแลระบบสำรองสำเร็จ',
                        text: `ตั้งผู้ดูแลระบบสำรอง ${secondaryOfficial} สำเร็จ`
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'ไม่สามารถตั้งผู้ดูแลระบบสำรองได้',
                        text: 'เกิดข้อผิดพลาดในการตั้งผู้ดูแลระบบสำรอง'
                    });
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถตั้งผู้ดูแลระบบสำรองได้',
                text: 'เกิดข้อผิดพลาดในการตั้งผู้ดูแลระบบสำรอง'
            });
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Official Dashboard</h1>
            <VotingControl
                startVoting={startVoting}
                endVoting={endVoting}
                resetVoting={resetVoting}
                votingState={votingState}
            />
            <div className="my-4">
                <h3 className="text-lg font-semibold">รายชื่อผู้สมัคร</h3>
                <ul className="list-disc pl-6">
                    {candidates.map((candidate, index) => (
                        <li key={index} className="mb-2">{candidate}</li>
                    ))}
                </ul>
            </div>
            <CandidateManagement
                newCandidate={newCandidate}
                setNewCandidate={setNewCandidate}
                candidates={candidates}
                addCandidate={addCandidate}
                candidateToRemove={candidateToRemove}
                setCandidateToRemove={setCandidateToRemove}
                removeCandidate={removeCandidate}
                candidateToUpdate={candidateToUpdate}
                setCandidateToUpdate={setCandidateToUpdate}
                updatedCandidateName={updatedCandidateName}
                setUpdatedCandidateName={setUpdatedCandidateName}
                updateCandidate={updateCandidate}
            />
            <SecondaryOfficial
                secondaryOfficial={secondaryOfficial}
                setSecondaryOfficial={setSecondaryOfficial}
                setSecondary={setSecondary}
            />
        </div>
    );
};

export default OfficialPage;
