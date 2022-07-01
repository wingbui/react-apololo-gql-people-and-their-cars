import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { AppInput } from '../appInput/AppInput';
import { AppSelect } from '../appSelect/AppSelect';
import { formatter } from '../../utils';
import { AppButton } from '../appButton/AppButton';
import { GET_CARS } from '../../graphQLService/queries';
import { DELETE_CAR, UPDATE_CAR } from '../../graphQLService/mutations';

export const CarCard = ({ car, peopleData = [] }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [carValues, setCarValues] = useState({
    model: car.model,
    make: car.make,
    year: car.year,
    price: car.price,
    personId: car.personId,
  });

  const [deleteCar] = useMutation(DELETE_CAR, {
    variables: { id: car.id },
    refetchQueries: [{ query: GET_CARS, variables: { id: car.id } }],
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    variables: {
      id: car.id,
      model: carValues.model,
      make: carValues.make,
      year: carValues.year,
      price: carValues.price,
      personId: carValues.personId,
    },
    refetchQueries: [{ query: GET_CARS, variables: { id: car.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    updateCar();
    setIsUpdating(false);
  };

  const handleCarChange = (e) => {
    setCarValues({ ...carValues, [e.target.name]: e.target.value });
  };

  if (isUpdating) {
    return (
      <div className='p-2'>
        <form onSubmit={onSubmit} className='grid gap-3 mt-4'>
          <AppInput
            label={'Model'}
            name={'model'}
            value={carValues.model}
            handleChange={handleCarChange}
          />
          <AppInput
            label={'Make'}
            name={'make'}
            value={carValues.make}
            handleChange={handleCarChange}
          />
          <AppInput
            label={'Year'}
            type='number'
            name={'year'}
            value={carValues.year}
            handleChange={handleCarChange}
          />
          <AppInput
            label={'Price'}
            name={'price'}
            type='number'
            value={carValues.price}
            handleChange={handleCarChange}
          />
          <AppSelect
            options={
              peopleData &&
              peopleData.map((p) => ({
                ...p,
                label: p.firstName + ' ' + p.lastName,
                value: p.id,
              }))
            }
            label='Choose an owner'
            handleChange={handleCarChange}
            name='personId'
            value={carValues.personId}
          />
          <div className='grid grid-cols-2'>
            <AppButton styles='bg-amber-400' type='submit'>
              Save
            </AppButton>
            <AppButton
              styles='bg-gray-200'
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </AppButton>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className='p-2 border'>
      <ul className='grid gap-3 mt-4'>
        <li className='bg-indigo-200 p-1'>{car.model}</li>
        <li>{car.make}</li>
        <li>{car.year}</li>
        <li>{formatter.format(car.price)}</li>
      </ul>
      <div className='border grid grid-cols-2'>
        <button
          className='bg-gray-400'
          onClick={() => {
            setIsUpdating(true);
          }}
        >
          Edit
        </button>
        <button className='bg-red-400' onClick={deleteCar}>
          Delete
        </button>
      </div>
    </div>
  );
};
