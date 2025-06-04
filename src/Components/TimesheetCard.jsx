// Time sheet Card
import React from 'react';
import TimesheetForm from './TimesheetForm';
import SelectedTypeDisplay from './SelectedTypeDisplay';
import BillingSection from './BillingSection';
import TotalSection from './TotalSection';

const TimesheetCard = ({ 
  timesheet, 
  onUpdateTimesheet, 
  onDeleteTimesheet, 
  onTypeSelect, 
  onCloseType 
}) => {
  const typeOptions = [
    { value: 'COAI', label: 'COAI - Correspondence admin activities' },
    { value: 'MEET', label: 'MEET - Meeting activities' },
    { value: 'RESE', label: 'RESE - Research activities' }
  ];

  const caseOptions = [
    { value: 'case1', label: 'Legal Case - Contract Review' },
    { value: 'case2', label: 'Corporate Matter - Merger Analysis' },
    { value: 'case3', label: 'Litigation - Civil Dispute' },
    { value: 'case4', label: 'Compliance - Regulatory Review' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg mb-6 p-4">
      <TimesheetForm
        timesheet={timesheet}
        typeOptions={typeOptions}
        caseOptions={caseOptions}
        onUpdateTimesheet={onUpdateTimesheet}
        onDeleteTimesheet={onDeleteTimesheet}
        onTypeSelect={onTypeSelect}
      />
      
      <SelectedTypeDisplay
        timesheet={timesheet}
        typeOptions={typeOptions}
        onCloseType={onCloseType}
      />

      <BillingSection
        timesheet={timesheet}
        onUpdateTimesheet={onUpdateTimesheet}
      />

      <TotalSection timesheet={timesheet} />
    </div>
  );
};

export default TimesheetCard;