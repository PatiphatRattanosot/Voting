import React, { useEffect, useState } from 'react';

const TopCandidates = ({ contract }) => {
    const [topCandidates, setTopCandidates] = useState([]);
    const [topVotes, setTopVotes] = useState([]);

    useEffect(() => {
        const loadTopCandidates = async () => {
            try {
                const [candidates, votes] = await contract.getTop3Candidates();

                const voteCounts = votes.map(vote => Number(vote));

                setTopCandidates(candidates);
                setTopVotes(voteCounts);
            } catch (error) {
                console.error('Error loading top candidates:', error);
            }
        };

        if (contract) {
            loadTopCandidates();
        }
    }, [contract]);

    return (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">ผลคะแนน 3 อันดับแรก</h2>
            <div className="mt-4">
                {topCandidates && topCandidates.length > 0 ? (
                    <ul className="space-y-3">
                        {topCandidates.map((candidate, index) => {
                            const rank = index + 1;
                            return (
                                <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                                    
                                    <span className="text-lg font-medium text-gray-700">
                                        {rank}. {candidate}
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        คะแนน: {topVotes[index].toLocaleString()}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>ไม่มีข้อมูลการโหวต</p>
                )}
            </div>
        </div>
    );
};

export default TopCandidates;
