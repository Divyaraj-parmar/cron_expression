

/*

Create Cron Expression Parsing Module that has the following functionalities.

1. Renders cron expression input field

2. Parses and displays individual cron fields accurately

Example:
Input: '0 15 12 1 JAN MON'
Output:
Seconds: 0 (active)
Minutes: 15 (active)
Hours: 12 (active)
Days: 1 (active)
Month: JAN (active)
Day of Week: MON (active)

3. Handles default values appropriately when * is used

Example:
Input: '* * * * * *'
Output:
Seconds: *
Minutes: *
Hours: *
Days: *
Month: *
Day of Week: *

4. Resets all fields gracefully when an invalid cron expression is detected (e.g., incorrect number of parts)

Example:
Input: '0 15 12 1 JAN'
Output:
Seconds: *
Minutes: *
Hours: *
Days: *
Month: *
Day of Week: *

5. Trims extra spaces and still parses the expression correctly

Example:
Input: '    0    15   12    1    JAN    MON   '
Output:
Seconds: 0 (active)
Minutes: 15 (active)
Hours: 12 (active)
Days: 1 (active)
Month: JAN (active)
Day of Week: MON (active)

NOTE: You are free to implement the task in any other way as well but shouldn't be hardcoded.

*/
import React, { useState, useMemo } from 'react';

const FIELD_NAMES = ['Seconds', 'Minutes', 'Hours', 'Days', 'Month', 'Day of Week'];

function parseCronExpression(input) {
  if (!input || typeof input !== 'string') {
    return FIELD_NAMES.map(() => ({ value: '*', active: false }));
  }
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 6) {
    return FIELD_NAMES.map(() => ({ value: '*', active: false }));
  }
  return parts.map((part) => {
    const trimmed = part.trim();
    const isActive = trimmed !== '' && trimmed !== '*';
    const displayValue = isActive ? trimmed : '*';
    return { value: displayValue, active: isActive };
  });
}

const CronExpressionEvaluator = () => {
  const [cronInput, setCronInput] = useState('');

  const parsedFields = useMemo(() => parseCronExpression(cronInput), [cronInput]);

  const handleInputChange = (e) => {
    setCronInput(e.target.value);
  };

  return (
    <div className="cron-evaluator">
      <div className="cron-inputs">
        <label htmlFor="cronInput">Cron Expression</label>
        <input
          type="text"
          id="cronInput"
          value={cronInput}
          onChange={handleInputChange}
          placeholder="e.g., 0 15 12 1 JAN MON or * * * * * *"
        />
      </div>

      <div className="cron-fields-preview">
        <h4>Parsed Fields</h4>
        {FIELD_NAMES.map((name, i) => (
          <div key={name} className="cron-field">
            <strong>{name}:</strong>{' '}
            <span className="cron-field-value">{parsedFields[i].value}</span>
            {parsedFields[i].active && (
              <span className="field-indicator" aria-label="active"> (active)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CronExpressionEvaluator;
