import React, { useState } from 'react';
import { ANIMALS } from '@frontendmasters/pet';

export default () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [breeds, setBreeds] = useState([]);

  return (
    <div className="search-params">
      <form action="">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>

        <label htmlFor="type">
          Animal
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onBlur={(e) => setType(e.target.value)}
          >
            <option value="all">All</option>
            {ANIMALS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
            disabled={!breeds.length}
          >
            <option value="all">All</option>
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <div>{location}</div>
        <div>{type}</div>
        <div>{breed}</div>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
