import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';

import useDropdown from './useDropdown';

export default () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [type, TypeDropDown] = useDropdown('Animal', '', ANIMALS);
  const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);

  useEffect(() => {
    // init breed when you change type
    setBreed("")
    pet
      .breeds('dog')
      .then(
        ({ breeds }) => setBreeds(breeds.map(({ name }) => name)),
        console.error
      );
  },[type]);

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
        <TypeDropDown></TypeDropDown>
        <BreedDropDown></BreedDropDown>
        <div>{location}</div>
        <div>{type}</div>
        <div>{breed}</div>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
