import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import 'babel-polyfill';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';
import Results from './Result';

export default () => {
  const [theme, setTheme] = useContext(ThemeContext);
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
        <label htmlFor="location">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
