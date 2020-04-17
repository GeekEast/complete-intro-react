import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import 'babel-polyfill';
import useDropdown from './useDropdown';

import Results from './Result';

export default () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [type, TypeDropDown] = useDropdown('Animal', '', ANIMALS);
  const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    const { animals } = await pet.animals({ location, breed, type });
    setPets(animals || []);
  };

  useEffect(() => {
    // init breed when you change type
    setBreed('');
    pet
      .breeds('dog')
      .then(
        ({ breeds }) => setBreeds(breeds.map(({ name }) => name)),
        console.error
      );
  }, [type]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getPets();
        }}
      >
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
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
