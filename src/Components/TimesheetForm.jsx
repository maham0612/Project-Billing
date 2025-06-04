// Time sheet Form
import React from 'react';

import { Calendar, Trash2 } from 'lucide-react'; // Use ES6 import instead of require

const TimesheetForm = ({ 
  timesheet, 
  typeOptions, 
  caseOptions, 
  onUpdateTimesheet, 
  onDeleteTimesheet, 
  onTypeSelect 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="relative">
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timesheet.selectedType}
            onChange={(e) => onTypeSelect(timesheet.id, e.target.value)}
          >
            <option value="">Type *</option>
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <div className="relative">
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timesheet.formData.date}
            onChange={(e) => onUpdateTimesheet(timesheet.id, {
              formData: { ...timesheet.formData, date: e.target.value }
            })}
          />
          <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Case</label>
        <select 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={timesheet.formData.case}
          onChange={(e) => onUpdateTimesheet(timesheet.id, {
            formData: { ...timesheet.formData, case: e.target.value }
          })}
        >
          <option value="">Case *</option>
          {caseOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timesheet.formData.description}
            onChange={(e) => onUpdateTimesheet(timesheet.id, {
              formData: { ...timesheet.formData, description: e.target.value }
            })}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => onDeleteTimesheet(timesheet.id)}
            className="px-3 py-2 text-red-600 hover:text-red-800 border border-gray-300 rounded-md hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimesheetForm;