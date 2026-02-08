

/*

Create Recurrence Pattern Description Module that has the following functionalities

1 .Renders recurrence pattern select field

2 .Shows daily pattern description with the selected time

Example:
Input:
Pattern: Daily
Time: 10:30 AM
Output: Runs every day at 10:30.

3. Displays weekly pattern description with selected days and time

Example:
Input:
Pattern: Weekly
Days Selected: Monday, Friday
Time: 08:30 AM
Output: Runs every week on Monday, Friday at 08:30.

4. Falls back to a generic weekly description when no days are selected

Example:
Input:
Pattern: Weekly
Days Selected: 'None'
Time: 06:30 PM
Output: Runs every week at 18:30.

5. Shows monthly pattern description with selected date and time

Example:
Input:
Pattern: Monthly
Date Selected: 15
Time: 09:00 AM
Output: Runs every month on the 15th day at 09:00.

6. Handles ordinal suffixes correctly (e.g., 1st, 2nd, 3rd, 11th, etc.)

NOTE: You are free to implement the task in any other way as well but shouldn't be hardcoded.

*/

import React, { useState, useMemo } from 'react';

const WEEKDAYS = [
  { value: 'MON', label: 'Monday' },
  { value: 'TUE', label: 'Tuesday' },
  { value: 'WED', label: 'Wednesday' },
  { value: 'THU', label: 'Thursday' },
  { value: 'FRI', label: 'Friday' },
  { value: 'SAT', label: 'Saturday' },
  { value: 'SUN', label: 'Sunday' },
];

/**
 * Converts "HH:mm" (24h) to "h:mm AM/PM".
 */
function formatTime12h(timeStr) {
  if (!timeStr) return '12:00 AM';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const min = String(m ?? 0).padStart(2, '0');
  return `${hour12}:${min} ${period}`;
}

/**
 * Returns ordinal suffix for day: 1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st, 22nd, 23rd, 31st.
 */
function getOrdinalSuffix(day) {
  const n = Number(day);
  if (Number.isNaN(n) || n < 1 || n > 31) return '';
  if (n >= 11 && n <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

const RecurrencePatternGenerator = () => {
  const [pattern, setPattern] = useState('daily');
  const [time, setTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState([]);
  const [monthDate, setMonthDate] = useState(15);

  const toggleDay = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const description = useMemo(() => {
    const timeFormatted = formatTime12h(time);
    if (pattern === 'daily') {
      return `Runs every day at ${timeFormatted}`;
    }
    if (pattern === 'weekly') {
      const dayLabels = WEEKDAYS.filter((d) => selectedDays.includes(d.value)).map((d) => d.label);
      if (dayLabels.length === 0) {
        return `Runs every week at ${timeFormatted}`;
      }
      const daysText = dayLabels.length === 1
        ? dayLabels[0]
        : dayLabels.slice(0, -1).join(', ') + ' and ' + dayLabels[dayLabels.length - 1];
      return `Runs every week on ${daysText} at ${timeFormatted}`;
    }
    if (pattern === 'monthly') {
      const ord = getOrdinalSuffix(monthDate);
      return `Runs every month on the ${monthDate}${ord} at ${timeFormatted}`;
    }
    return '';
  }, [pattern, time, selectedDays, monthDate]);

  return (
    <div className="recurrence-form">
      <div className="form-group">
        <label htmlFor="pattern">Recurrence Pattern</label>
        <select
          id="pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {pattern === 'weekly' && (
        <div className="form-group">
          <label>Days of the week</label>
          <div className="days-selection">
            {WEEKDAYS.map(({ value, label }) => (
              <label key={value} className="day-checkbox">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(value)}
                  onChange={() => toggleDay(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}

      {pattern === 'monthly' && (
        <div className="form-group">
          <label htmlFor="monthDate">Day of month (1–31)</label>
          <select
            id="monthDate"
            value={monthDate}
            onChange={(e) => setMonthDate(Number(e.target.value))}
            className="date-input"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}{getOrdinalSuffix(d)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          className="time-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="description">
        <h3>Generated Description</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RecurrencePatternGenerator;
