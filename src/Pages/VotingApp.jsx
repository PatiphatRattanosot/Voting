import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../useContexts/Web3Context';
import Swal from 'sweetalert2';
import TopCandidates from '../components/TopCandidates';

const VotingApp = () => {
    const { contract, provider, isActive, votingState } = useWeb3();

    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState({});
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (contract) {
            const loadCandidates = async () => {
                const candidatesList = await contract.getCandidateList();
                setCandidates(candidatesList);

                const voteCount = {};
                for (let candidate of candidatesList) {
                    const vote = await contract.totalVotesFor(candidate);
                    voteCount[candidate] = vote.toNumber();
                }
                setVotes(voteCount);
            };

            const checkVotingStatus = async () => {
                const hasVotedStatus = await contract.checkVotedStatus();
                setHasVoted(hasVotedStatus);
            };

            loadCandidates();
            checkVotingStatus();
        }
    }, [contract]);

    const handleVote = async (candidate) => {
        if (!hasVoted) {
            try {
                const loadingSwal = Swal.fire({
                    title: 'กำลังดำเนินการ...',
                    text: 'โปรดรอสักครู่ ขณะกำลังลงคะแนน',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const tx = await contract.voteForCandidate(candidate);

                provider.once(tx.hash, (receipt) => {
                    loadingSwal.close();
                    if (receipt && receipt.status === 1) {
                        Swal.fire({
                            icon: 'success',
                            title: 'โหวตสำเร็จ!',
                            text: `คุณได้ลงคะแนนให้ ${candidate} แล้ว!`,
                            confirmButtonText: 'ตกลง',
                        });
                        setHasVoted(true);
                        setVotes((prevVotes) => ({
                            ...prevVotes,
                            [candidate]: prevVotes[candidate] + 1,
                        }));
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'ไม่สามารถบันทึกการโหวตได้',
                            confirmButtonText: 'ตกลง',
                        });
                    }
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'เกิดข้อผิดพลาดในการลงคะแนน',
                    confirmButtonText: 'ตกลง',
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'คุณได้ลงคะแนนแล้ว',
                text: 'ไม่สามารถลงคะแนนได้อีก',
                confirmButtonText: 'ตกลง',
            });
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div>
                {!isActive ? (
                    <div className="text-lg text-center p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
                        โปรดเชื่อมต่อกับ MetaMask เพื่อใช้งานระบบนี้
                    </div>
                ) : (
                    <>
                        {votingState === 'Created' && (
                            <div className="text-lg text-gray-600 text-center p-4 bg-yellow-100 rounded-lg shadow-md">
                                ระบบยังไม่เปิดให้โหวต
                            </div>
                        )}

                        {votingState === 'Voting' && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">ผู้สมัครทั้งหมด</h2>
                                <ul className="space-y-4">
                                    {candidates.map((candidate) => (
                                        <li key={candidate} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                                            <span className="text-xl font-medium text-gray-700">{candidate}</span>
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-500 mr-4">{votes[candidate]} คะแนน</span>
                                                <button
                                                    onClick={() => handleVote(candidate)}
                                                    disabled={hasVoted}
                                                    className={`ml-4 px-4 py-2 rounded-lg text-white ${hasVoted ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} transition duration-200`}
                                                >
                                                    โหวต
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        สถานะการโหวตของคุณ: {hasVoted ? 'คุณได้ลงคะแนนแล้ว' : 'ยังไม่ได้ลงคะแนน'}
                                    </h3>
                                </div>
                            </div>
                        )}

                        {votingState === 'Ended' && (
                            <div>
                                <div className="text-lg text-center p-4 bg-gray-200 rounded-lg shadow-md text-gray-700">
                                    การโหวตสิ้นสุดแล้ว
                                </div>
                                <TopCandidates contract={contract} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VotingApp;
