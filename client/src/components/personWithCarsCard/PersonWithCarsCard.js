import React from 'react';
import { CarCard } from '../carCard/CardCard';

import { PersonCard } from '../personCard/personCard';

export const PersonWithCarsCard = ({ personWithCars }) => {
  return (
    <div className='mt-5 grid gap-5'>
      {personWithCars.map((pwc) => {
        return (
          <PersonCard key={pwc.id} person={pwc}>
            <div className=' grid gap-3 p-2'>
              {pwc.cars.map((car) => (
                <CarCard key={car.id} car={car} peopleData={personWithCars} />
              ))}
            </div>
          </PersonCard>
        );
      })}
    </div>
  );
};
