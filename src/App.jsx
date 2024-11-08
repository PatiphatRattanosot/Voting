import React from 'react';
import VotingApp from './Pages/VotingApp';

function App() {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">ระบบการโหวต</h1>
      </div>
      <VotingApp />
    </>
  );
}

export default App;
