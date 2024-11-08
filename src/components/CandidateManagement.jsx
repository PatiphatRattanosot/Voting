import React from 'react';

const CandidateManagement = ({
    newCandidate,
    setNewCandidate,
    addCandidate,
    candidates,
    candidateToRemove,
    setCandidateToRemove,
    removeCandidate,
    candidateToUpdate,
    setCandidateToUpdate,
    updatedCandidateName,
    setUpdatedCandidateName,
    updateCandidate
}) => (
    <div className="mb-4">
        <div className="my-4">
            <input
                type="text"
                value={newCandidate}
                onChange={(e) => setNewCandidate(e.target.value)}
                className="px-4 py-2 border rounded mb-2"
                placeholder="ชื่อผู้สมัครใหม่"
            />
            <button onClick={addCandidate} className="bg-blue-500 text-white py-2 px-4 rounded">
                เพิ่มผู้สมัคร
            </button>
        </div>

        <div className="my-4">
            <select
                value={candidateToRemove}
                onChange={(e) => setCandidateToRemove(e.target.value)}
                className="px-4 py-2 border rounded mb-2 "
            >
                <option value="">เลือกผู้สมัครที่ต้องการลบ</option>
                {candidates.map((candidate, index) => (
                    <option key={index} value={candidate}>
                        {candidate}
                    </option>
                ))}
            </select>
            <button onClick={removeCandidate} className="bg-red-500 text-white py-2 px-4 rounded mt-2">
                ลบผู้สมัคร
            </button>
        </div >

        <div className="my-4">
            <input
                type="text"
                value={candidateToUpdate}
                onChange={(e) => setCandidateToUpdate(e.target.value)}
                className="px-4 py-2 border rounded mb-2"
                placeholder="ชื่อผู้สมัครเดิม"
            />
            <input
                type="text"
                value={updatedCandidateName}
                onChange={(e) => setUpdatedCandidateName(e.target.value)}
                className="px-4 py-2 border rounded mb-2"
                placeholder="ชื่อผู้สมัครใหม่"
            />
            <button onClick={updateCandidate} className="bg-yellow-500 text-white py-2 px-4 rounded">
                แก้ไขผู้สมัคร
            </button>
        </div>
    </div >
);

export default CandidateManagement;
