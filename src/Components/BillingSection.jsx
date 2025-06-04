// BillingSection
import React from 'react';

import { Plus } from 'lucide-react';
import BillingHeader from './BillingHeader';
import BillingItem from './BillingItem';

const BillingSection = ({ timesheet, onUpdateTimesheet }) => {
  if (!timesheet.showBillingSection) return null;

  const addBillingItem = () => {
    const newItem = {
      id: Date.now(),
      type: 'working_time',
      rate: 0,
      quantity: '00:00:00',
      customQuantity: '',
      customTime: '',
      status: 'billable',
      amount: 0
    };
    const updatedBillingItems = [...timesheet.billingItems, newItem];
    onUpdateTimesheet(timesheet.id, { billingItems: updatedBillingItems });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <BillingHeader />
      {timesheet.billingItems.map((item) => (
        <BillingItem
          key={item.id}
          item={item}
          timesheet={timesheet}
          onUpdateTimesheet={onUpdateTimesheet}
        />
      ))}
      <button
        onClick={addBillingItem}
        className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-4"
      >
        <Plus size={16} />
        Add billing item
      </button>
    </div>
  );
};

export default BillingSection;