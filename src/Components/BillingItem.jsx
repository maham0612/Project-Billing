// BillingItem
import React from 'react';
import { Trash2 } from 'lucide-react'; 
import QuantityInput from './QuantityInput';
const BillingItem = ({ item, timesheet, onUpdateTimesheet }) => {
  const billingTypes = [
    { value: 'working_time', label: 'working time' },
    { value: 'travel_time', label: 'travel time' },
    { value: 'kilometer', label: 'kilometer' }
  ];

  const timeOptions = [
    '00:15:00', '00:30:00', '00:45:00', '01:00:00', 
    '01:15:00', '01:30:00', '02:00:00', '03:00:00'
  ];

  const updateBillingItem = (field, value) => {
    const updatedItems = timesheet.billingItems.map(billingItem => {
      if (billingItem.id === item.id) {
        const updatedItem = { ...billingItem, [field]: value };
        
        // Calculate amount when rate or quantity changes
        if (field === 'rate' || field === 'quantity' || field === 'customQuantity' || field === 'customTime') {
          let quantity = 0;
          if (updatedItem.type === 'kilometer') {
            quantity = parseFloat(updatedItem.customQuantity) || 0;
          } else {
            // Use custom time if available, otherwise use dropdown selection
            const timeToUse = updatedItem.customTime || updatedItem.quantity;
            const timeParts = timeToUse.split(':');
            quantity = parseInt(timeParts[0]) + (parseInt(timeParts[1]) / 60) + (parseInt(timeParts[2]) / 3600);
          }
          updatedItem.amount = (parseFloat(updatedItem.rate) || 0) * quantity;
        }
        
        return updatedItem;
      }
      return billingItem;
    });
    onUpdateTimesheet(timesheet.id, { billingItems: updatedItems });
  };

  const removeBillingItem = () => {
    const updatedItems = timesheet.billingItems.filter(billingItem => billingItem.id !== item.id);
    onUpdateTimesheet(timesheet.id, { billingItems: updatedItems });
  };

  return (
    <div className="grid grid-cols-6 gap-4 mb-3 items-center">
      <div>
        <select
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          value={item.type}
          onChange={(e) => updateBillingItem('type', e.target.value)}
        >
          {billingTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="number"
          placeholder="€ 0"
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          value={item.rate}
          onChange={(e) => updateBillingItem('rate', e.target.value)}
        />
      </div>

      <QuantityInput
        item={item}
        timeOptions={timeOptions}
        onUpdate={updateBillingItem}
      />

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={item.status === 'billable'}
            onChange={(e) => updateBillingItem('status', e.target.checked ? 'billable' : 'non-billable')}
            className="mr-2"
          />
          <span className="text-sm">Billable</span>
        </div>
      </div>

      <div className="text-sm font-medium">
        € {item.amount.toFixed(2)}
      </div>

      <div>
        <button
          onClick={removeBillingItem}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default BillingItem;