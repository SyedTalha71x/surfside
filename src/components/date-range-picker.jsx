"use client"

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { format } from "date-fns"

export default function DateRangePicker({ dateRange, onDateRangeChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCustomRange, setIsCustomRange] = useState(false)
  const [tempStartDate, setTempStartDate] = useState(format(dateRange.startDate, "yyyy-MM-dd"))
  const [tempEndDate, setTempEndDate] = useState(format(dateRange.endDate, "yyyy-MM-dd"))

  // Remove TypeScript type annotation
  const dropdownRef = useRef(null)

  // Format date range for display
  const formatDateRange = () => {
    const start = format(dateRange.startDate, "MMM d")
    const end = format(dateRange.endDate, "MMM d, yyyy")
    return `${start} - ${end}`
  }

  // Predefined ranges
  const predefinedRanges = [
    { label: "Today", days: 0 },
    { label: "Yesterday", days: 1 },
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "This month", days: "month" },
    { label: "Custom range", days: "custom" },
  ]

  // Apply predefined range
  const applyPredefinedRange = (days) => {
    const end = new Date()
    let start = new Date()

    if (days === "month") {
      start = new Date(end.getFullYear(), end.getMonth(), 1)
    } else if (days === "custom") {
      setIsCustomRange(true)
      return
    } else {
      start = new Date(end)
      start.setDate(end.getDate() - days)
    }

    onDateRangeChange({
      startDate: start,
      endDate: end,
      key: "selection",
    })

    setIsCustomRange(false)
    setIsOpen(false)
  }

  // Apply custom range
  const applyCustomRange = () => {
    try {
      const start = new Date(tempStartDate)
      const end = new Date(tempEndDate)

      if (start > end) {
        alert("Start date cannot be after end date")
        return
      }

      onDateRangeChange({
        startDate: start,
        endDate: end,
        key: "selection",
      })

      setIsOpen(false)
    } catch (error) {
      alert("Invalid date format")
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F5F5F5] text-gray-700 text-xs rounded-lg px-3 py-1.5 border border-gray-200 flex items-center gap-1"
      >
        <Calendar className="h-3 w-3" />
        <span>{formatDateRange()}</span>
        <ChevronDown className="h-3 w-3 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-64 z-10">
          <div className="px-3 py-2 border-b border-gray-100">
            <h3 className="text-sm font-medium">Select range</h3>
          </div>

          {/* Predefined ranges */}
          <div className="max-h-48 overflow-y-auto">
            {predefinedRanges.map((range) => (
              <div
                key={range.label}
                onClick={() => applyPredefinedRange(range.days)}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {range.label}
              </div>
            ))}
          </div>

          {/* Custom range picker */}
          {isCustomRange && (
            <div className="p-3 border-t border-gray-100">
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Start date</label>
                  <input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => setTempStartDate(e.target.value)}
                    className="w-full text-sm p-1.5 border border-gray-200 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">End date</label>
                  <input
                    type="date"
                    value={tempEndDate}
                    onChange={(e) => setTempEndDate(e.target.value)}
                    className="w-full text-sm p-1.5 border border-gray-200 rounded"
                  />
                </div>
                <button
                  onClick={applyCustomRange}
                  className="w-full bg-blue-600 text-white text-sm rounded py-1.5 mt-2 hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

