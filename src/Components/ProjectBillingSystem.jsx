import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import TimesheetCard from './TimesheetCard';

export default function ProjectBillingSystem() {
    const [timesheets, setTimesheets] = useState([]);
    const [nextTimesheetId, setNextTimesheetId] = useState(1);

    const hasAddedInitial = useRef(false); // flag to track initial add

    const addTimesheet = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const localDate = `${year}-${month}-${day}`;

        console.log("Today's date:", localDate);
        const newTimesheet = {
            id: nextTimesheetId,
            selectedType: '',
            showBillingSection: false,
            billingItems: [],
            formData: {
                date: localDate,
                case: '',
                description: ''
            }
        };
        setTimesheets(prev => [...prev, newTimesheet]);
        setNextTimesheetId(prev => prev + 1);
    };

    useEffect(() => {
        if (!hasAddedInitial.current) {
            addTimesheet();
            hasAddedInitial.current = true; // mark that we added the initial timesheet
        }
    }, []); // run once on mount only

    const deleteTimesheet = (timesheetId) => {
        setTimesheets(timesheets.filter(ts => ts.id !== timesheetId));
    };

    const updateTimesheet = (timesheetId, updates) => {
        setTimesheets(timesheets.map(ts =>
            ts.id === timesheetId ? { ...ts, ...updates } : ts
        ));
    };

    const handleTypeSelect = (timesheetId, type) => {
        const timesheet = timesheets.find(ts => ts.id === timesheetId);
        if (timesheet) {
            const updates = {
                selectedType: type,
                showBillingSection: true,
                billingItems: [{
                    id: 1,
                    type: 'working_time',
                    rate: 0,
                    quantity: '00:00:00',
                    customQuantity: '',
                    customTime: '',
                    status: 'billable',
                    amount: 0
                }]
            };
            updateTimesheet(timesheetId, updates);
        }
    };

    const handleCloseType = (timesheetId) => {
        const updates = {
            selectedType: '',
            showBillingSection: false,
            billingItems: []
        };
        updateTimesheet(timesheetId, updates);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Project Billing</h1>
                    <button
                        onClick={addTimesheet}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Timesheet
                    </button>
                </div>

                {timesheets.map((timesheet) => (
                    <TimesheetCard
                        key={timesheet.id}
                        timesheet={timesheet}
                        onUpdateTimesheet={updateTimesheet}
                        onDeleteTimesheet={deleteTimesheet}
                        onTypeSelect={handleTypeSelect}
                        onCloseType={handleCloseType}
                    />
                ))}
            </div>
        </div>
    );
}
