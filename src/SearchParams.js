import React, { useState } from 'react';
import { ANIMALS } from '@frontendmasters/pet';
import Dropdown from './Dropdown';

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

        <Dropdown
          state={type}
          setState={setType}
          id="type"
          label="Animal"
          options={ANIMALS}
        ></Dropdown>

        <Dropdown
          state={breed}
          setState={setBreed}
          id="breed"
          label="Breed"
          options={breeds}
        ></Dropdown>

        <div>{location}</div>
        <div>{type}</div>
        <div>{breed}</div>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
