import React from 'react';

const SecondaryOfficial = ({ secondaryOfficial, setSecondaryOfficial, setSecondary }) => (
    <div className="my-4">
        <input
            type="text"
            value={secondaryOfficial}
            onChange={(e) => setSecondaryOfficial(e.target.value)}
            className="px-4 py-2 border rounded mb-2"
            placeholder="ที่อยู่ของผู้ดูแลระบบสำรอง"
        />
        <button onClick={setSecondary} className="bg-blue-500 text-white py-2 px-4 rounded">
            ตั้งผู้ดูแลระบบสำรอง
        </button>
    </div>
);

export default SecondaryOfficial;
