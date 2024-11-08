import React from 'react';

const VotingControl = ({ startVoting, endVoting, resetVoting, votingState }) => (
    <div className="">
        <div className="flex flex-col md:flex-row  mb-6">
            <button
                onClick={startVoting}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2 mb-4 md:mb-0 transition duration-200 ease-in-out"
            >
                เริ่มการโหวต
            </button>
            <button
                onClick={endVoting}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-2 mb-4 md:mb-0 transition duration-200 ease-in-out"
            >
                สิ้นสุดการโหวต
            </button>
            <button
                onClick={resetVoting}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
            >
                รีเซ็ตการโหวต
            </button>
        </div>

        <h2 className="text-2xl font-semibold mt-4">
            สถานะการโหวตของคุณ:{" "}
            <span className={
                (() => {
                    switch (votingState) {
                        case 'Created':
                            return 'text-gray-500';
                        case 'Voting':
                            return 'text-blue-500';
                        case 'Ended':
                            return 'text-red-500';
                        default:
                            return 'text-black';
                    }
                })()
            }>
                {(() => {
                    switch (votingState) {
                        case 'Created':
                            return 'ยังไม่เปิดโหวต';
                        case 'Voting':
                            return 'อยู่ในการโหวต';
                        case 'Ended':
                            return 'สิ้นสุดการโหวต';
                        default:
                            return 'Unknown';
                    }
                })()}
            </span>
        </h2>
    </div>
);

export default VotingControl;
