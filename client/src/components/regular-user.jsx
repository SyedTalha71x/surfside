import { Users } from "lucide-react"
import { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { BASE_URL } from '../utils/api'


const RegularUserCard = () => {
  const [regularUsers, setRegularUsers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    fetchRegularUsers()
  }, [selectedDate])

  const fetchRegularUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const startDate = new Date(selectedDate)
      startDate.setDate(1) 
      
      const endDate = new Date(selectedDate)
      endDate.setMonth(endDate.getMonth() + 1)
      endDate.setDate(0) 

      const response = await axios.get(`${BASE_URL}/regular-users`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      })

      if (response.data.success) {
        // Store the returned data array
        setRegularUsers(response.data.data || [])
        
        // Calculate total count by summing up regularUsers across all dates
        const total = response.data.data.reduce((sum, item) => sum + item.regularUsers, 0)
        setTotalCount(total)
      } else {
        setError(response.data.message || 'Failed to fetch regular users')
      }
    } catch (err) {
      console.error('Error fetching regular users:', err)
      setError('Failed to fetch regular users. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
  }

  const formatMonthYear = (date) => {
    return format(date, 'MMM yyyy')
  }

  return (
    <div className="bg-white rounded-2xl p-5 h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Icon */}
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="h-8 w-8 text-purple-600" />
        </div>

        {/* Number and Label */}
        <div className="text-center">
          {loading ? (
            <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900">{totalCount}</h2>
              <p className="text-purple-600 text-sm">Regular users</p>
              <p className="text-xs text-gray-500 mt-1">
                {regularUsers.length > 0 ? `Across ${regularUsers.length} days` : "No data"}
              </p>
            </>
          )}
        </div>

        {/* Date Selector */}
        <div className="relative">
          <button 
            className="flex items-center gap-1 px-3 py-1.5 border border-amber-400 rounded-md text-gray-500 text-xs"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            {formatMonthYear(selectedDate)}
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
  )
}

export default RegularUserCard