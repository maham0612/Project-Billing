// Selected Type Display
import React from 'react';
import { X } from 'lucide-react'; // Use ES6 import instead of require

const SelectedTypeDisplay = ({ timesheet, typeOptions, onCloseType }) => {
  if (!timesheet.selectedType) return null;

  return (
    <div className="mb-6">
      <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
        <span className="text-blue-800 mr-2">
          {typeOptions.find(opt => opt.value === timesheet.selectedType)?.label}
        </span>
        <button
          onClick={() => onCloseType(timesheet.id)}
          className="text-blue-600 hover:text-blue-800"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default SelectedTypeDisplay;