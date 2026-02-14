

import React, { useState, useMemo } from 'react';

const FIELD_NAMES = ['Seconds', 'Minutes', 'Hours', 'Days', 'Month', 'Day of Week'];

const PREVIEW_FIELDS = [
  { label: 'minute (0-59)', index: 1 },
  { label: 'hour (0 - 23)', index: 2 },
  { label: 'day of the month (1 - 31)', index: 3 },
  { label: 'month (1 - 12)', index: 4 },
  { label: 'day of the week (0 - 6)', index: 5 },
];

const EXAMPLES = [
  {
    title: 'Parses and displays individual cron fields accurately',
    input: "0 15 12 1 JAN MON",
    output: [
      'Seconds: 0 (active)',
      'Minutes: 15 (active)',
      'Hours: 12 (active)',
      'Days: 1 (active)',
      'Month: JAN (active)',
      'Day of Week: MON (active)',
    ],
  },
  {
    title: 'Handles default values appropriately when * is used',
    input: '* * * * * *',
    output: [
      'Seconds: *',
      'Minutes: *',
      'Hours: *',
      'Days: *',
      'Month: *',
      'Day of Week: *',
    ],
  },
  {
    title: 'Resets all fields gracefully when an invalid cron expression is detected',
    input: '0 15 12 1 JAN',
    output: [
      'Seconds: *',
      'Minutes: *',
      'Hours: *',
      'Days: *',
      'Month: *',
      'Day of Week: *',
    ],
  },
  {
    title: 'Trims extra spaces and still parses the expression correctly',
    input: '    0    15   12    1    JAN    MON   ',
    output: [
      'Seconds: 0 (active)',
      'Minutes: 15 (active)',
      'Hours: 12 (active)',
      'Days: 1 (active)',
      'Month: JAN (active)',
      'Day of Week: MON (active)',
    ],
  },
];

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
        <label htmlFor="cronInput" className="cron-inputs-title">Cron Expression</label>
        <div className="cron-inputs-input">
          <input
            type="text"
            id="cronInput"
            value={cronInput}
            onChange={handleInputChange}
            placeholder="e.g., 0 15 12 1 JAN MON or * * * * * *"
          />
        </div>
      </div>
      <h4>Parsed Fields</h4>
      <p className="cron-fields-intro">The cron expression is made of five fields. Each field can have the following values.</p>
      <div className="cron-fields-preview">
        {PREVIEW_FIELDS.map(({ label, index }) => (
          <div key={`value-${label}`} className="cron-field-value-cell">{parsedFields[index].value}</div>
        ))}
        {PREVIEW_FIELDS.map(({ label }) => (
          <div key={`label-${label}`} className="cron-field-label-cell">{label}</div>
        ))}
      </div>

      <section className="cron-examples">
        <h4>Examples</h4>
        {EXAMPLES.map((example, i) => (
          <div key={i} className="cron-example-block">
            <div className="cron-example-title">{example.title}</div>
            <div className="cron-example-row">
              <span className="cron-example-label">Input:</span>
              <code className="cron-example-input">{example.input}</code>
            </div>
            <div className="cron-example-row">
              <span className="cron-example-label">Output:</span>
              <ul className="cron-example-output">
                {example.output.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CronExpressionEvaluator;
