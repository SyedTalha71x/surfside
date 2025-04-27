import { MapPin } from "lucide-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BASE_URL } from "../utils/api";

const VisitorCard = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchVisitorData();
  }, [selectedDate]);

  const fetchVisitorData = async () => {
    try {
      setLoading(true);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      
      const response = await axios.get(`${BASE_URL}/total-visitors`, {
        params: { year, month }
      });
      
      setTotalVisitors(response.data.totalVisits);
    } catch (error) {
      console.error('Error fetching visitor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateForDisplay = (date) => {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <div className="bg-white rounded-2xl p-5 h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <MapPin className="h-8 w-8 text-green-600" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {loading ? '...' : totalVisitors.toLocaleString()}
          </h2>
          <p className="text-purple-600 text-sm">Visitors</p>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-1 px-3 py-1.5 border border-amber-400 rounded-md text-gray-500 text-xs"
          >
            {formatDateForDisplay(selectedDate)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showDatePicker && (
            <div className="absolute z-10 mt-1">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                inline
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorCard;