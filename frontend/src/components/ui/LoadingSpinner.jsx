import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-8 h-8 border-2 border-sand border-t-clay rounded-full animate-spin" />
    <p className="text-sm text-stone font-body">{message}</p>
  </div>
);

export default LoadingSpinner;
