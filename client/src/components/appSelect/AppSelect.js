import React from 'react';

export const AppSelect = ({ label, handleChange, options, name }) => {
  return (
    <div className='grid grid-cols-3'>
      <label className='self-center'>{label}</label>
      <select
        className='col-span-2 border border-gray-200 border-solid rounded-l px-2 py-1'
        name={name}
        onChange={handleChange}
      >
        {options.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
