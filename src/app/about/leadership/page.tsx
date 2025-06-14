import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const LeadershipPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>Leadership Page Placeholder</h1>
        <p>This page content will be added later.</p>
      </div>
    </Suspense>

  );
};

export default LeadershipPage;