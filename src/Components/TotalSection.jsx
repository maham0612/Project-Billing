// Total Section
import React from 'react';

const TotalSection = ({ timesheet }) => {
  const calculateTotalDuration = (billingItems) => {
    let totalSeconds = 0;
    billingItems.forEach(item => {
      if (item.type !== 'kilometer') {
        const timeToUse = item.customTime || item.quantity;
        const timeParts = timeToUse.split(':');
        totalSeconds += parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
      }
    });
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}h: ${minutes.toString().padStart(2, '0')}m: ${seconds.toString().padStart(2, '0')}s`;
  };

  const calculateTotalAmount = (billingItems) => {
    return billingItems.reduce((total, item) => total + item.amount, 0).toFixed(2);
  };

  return (
    <div className="flex justify-end">
      <div className="text-right">
        <div className="flex gap-8 mb-2">
          <div>
            <div className="text-sm text-gray-600">Total Duration</div>
            <div className="font-medium">{calculateTotalDuration(timesheet.billingItems)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Amount</div>
            <div className="font-medium">€ {calculateTotalAmount(timesheet.billingItems)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSection;