// QuantityInput Component
import React, { useState, useRef, useEffect } from 'react';

const QuantityInput = ({ item, timeOptions, onUpdate }) => {

    // Time formatting function
    const formatTimeInput = (value) => {
        // Remove any non-digit characters except colons
        let cleaned = value.replace(/[^\d:]/g, '');

        // If user types continuous digits, format them
        if (!cleaned.includes(':')) {
            if (cleaned.length === 1) {
                return `0${cleaned}:00:00`;
            } else if (cleaned.length === 2) {
                return `${cleaned}:00:00`;
            } else if (cleaned.length === 3) {
                return `0${cleaned.charAt(0)}:${cleaned.substring(1)}:00`;
            } else if (cleaned.length === 4) {
                return `${cleaned.substring(0, 2)}:${cleaned.substring(2)}:00`;
            } else if (cleaned.length === 5) {
                return `0${cleaned.charAt(0)}:${cleaned.substring(1, 3)}:${cleaned.substring(3)}`;
            } else if (cleaned.length === 6) {
                return `${cleaned.substring(0, 2)}:${cleaned.substring(2, 4)}:${cleaned.substring(4)}`;
            }
        }

        // Split by colons and validate
        let parts = cleaned.split(':');
        parts = parts.slice(0, 3); // Max 3 parts

        // Validate and format each part
        const formatted = parts.map((part, index) => {
            if (!part) return '00';

            let num = parseInt(part, 10) || 0;

            if (index === 0) { // Hours
                num = Math.min(23, Math.max(0, num));
            } else { // Minutes/Seconds
                num = Math.min(59, Math.max(0, num));
            }

            return num.toString().padStart(2, '0');
        });

        // Fill missing parts with 00
        while (formatted.length < 3) {
            formatted.push('00');
        }

        return formatted.join(':');
    };

    const handleTimeChange = (e) => {
        let value = e.target.value;

        // Remove any non-digit characters except colons
        value = value.replace(/[^\d:]/g, '');

        // Auto-add colons as user types
        if (value.length === 2 && !value.includes(':')) {
            value = value + ':';
        } else if (value.length === 5 && value.split(':').length === 2) {
            value = value + ':';
        }

        // Limit to HH:MM:SS format (8 characters max)
        if (value.length > 8) {
            value = value.substring(0, 8);
        }

        onUpdate('quantity', value);
    };

    const handleTimeBlur = (e) => {
        const value = e.target.value;
        if (value.trim()) {
            const formatted = formatTimeInput(value);
            onUpdate('quantity', formatted);
        }
    };

    // State for dropdown
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionSelect = (time) => {
        onUpdate('quantity', time);
        setIsOpen(false);
        inputRef.current?.focus();
    };
    // Handle kilometer input
    if (item.type === 'kilometer') {
        return (
            <div>
                <input
                    type="number"
                    placeholder="Enter kilometers"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    value={item.customQuantity || ''}
                    onChange={(e) => onUpdate('customQuantity', e.target.value)}
                />
            </div>
        );
    }
    // Time input UI
    return (
        <div className="relative" ref={dropdownRef}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full px-2 py-1 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={item.quantity || ''}
                    onChange={handleTimeChange}
                    onBlur={handleTimeBlur}
                    onFocus={() => setIsOpen(true)}
                    placeholder="HH:MM:SS"
                    maxLength={8}
                    autoComplete="off"
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-2 hover:bg-gray-50"
                    onClick={() => {
                        setIsOpen(!isOpen);
                        inputRef.current?.focus();
                    }}
                >
                    <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                        <button
                            key={time}
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:bg-blue-50"
                            onClick={() => handleOptionSelect(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default QuantityInput;