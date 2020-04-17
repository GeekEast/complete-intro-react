import React from 'react'

const Dropdown = (state, setState, id, label, options) => {
    return (
        <label htmlFor={id}>
        {label}
        <select
          id={id}
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={(e) => setState(e.target.value)}
          disabled={!options.length}
        >
          <option value="all">All</option>
          {
              options.map(o => (
              <option key={o} value={o}>{o}</option>
              ))
          }
        </select>
      </label>
    )
}

export default Dropdown
