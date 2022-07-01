import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { AppInput } from '../../components/appInput/AppInput';
import { AppSelect } from '../../components/appSelect/AppSelect';
import { Heading } from '../../heading/Heading';
import { AppButton } from '../../components/appButton/AppButton';
import { GET_CARS, GET_PEOPLE } from '../../graphQLService/queries';
import { ADD_CAR, ADD_PERSON } from '../../graphQLService/mutations';
import { PersonWithCarsCard } from '../../components/personWithCarsCard/PersonWithCarsCard';

export const Home = () => {
  const { data: peopleData } = useQuery(GET_PEOPLE);
  const { data: carsData } = useQuery(GET_CARS);

  const [personValues, setPersonValues] = useState({
    firstName: '',
    lastName: '',
  });
  const [carValues, setCarValues] = useState({
    year: '',
    model: '',
    price: '',
    make: '',
    personId: '',
  });

  const [addPerson] = useMutation(ADD_PERSON, {
    variables: {
      firstName: personValues.firstName,
      lastName: personValues.lastName,
    },
    update(cache, { data: { addPerson } }) {
      const { persons } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { persons: persons.concat([addPerson]) },
      });
    },
  });

  const [addCar] = useMutation(ADD_CAR, {
    variables: {
      year: carValues.year,
      model: carValues.model,
      price: carValues.price,
      make: carValues.make,
      personId: carValues.personId,
    },
    update(cache, { data: { addCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: { cars: cars.concat([addCar]) },
      });
    },
  });

  const onAddPerson = (e) => {
    e.preventDefault();
    if (!personValues.lastName || !personValues.firstName) {
      alert('Please enter all the fields');
    }
    addPerson();
    setPersonValues({
      firstName: '',
      lastName: '',
    });
  };

  const onAddCar = (e) => {
    e.preventDefault();
    if (
      !carValues.year ||
      !carValues.make ||
      !carValues.model ||
      !carValues.price ||
      !carValues.personId
    ) {
      alert('Please enter all the fields');
    }
    addCar();
    setCarValues({
      year: '',
      model: '',
      price: '',
      make: '',
      personId: '',
    });
  };

  const handlePersonChange = (e) => {
    setPersonValues({ ...personValues, [e.target.name]: e.target.value });
  };
  const handleCarChange = (e) => {
    setCarValues({ ...carValues, [e.target.name]: e.target.value });
  };

  const renderPersonWithCars = () => {
    let personWithCars;

    if (peopleData && carsData) {
      personWithCars = peopleData.persons.map((person) => {
        return {
          ...person,
          cars: carsData.cars.filter((car) => person.id === car.personId),
        };
      });
    }
    return <PersonWithCarsCard personWithCars={personWithCars} />;
  };

  return (
    <div>
      <section className='max-w-sm mx-auto border border-sky-500 border-solid p-5 mb-5'>
        <Heading text='Add Person' />

        <form onSubmit={onAddPerson} className='grid gap-3 mt-4'>
          <AppInput
            label={'First Name'}
            name={'firstName'}
            value={personValues.firstName}
            handleChange={handlePersonChange}
          />
          <AppInput
            label={'Last Name'}
            name={'lastName'}
            value={personValues.lastName}
            handleChange={handlePersonChange}
          />
          <div className='text-center grid grid-cols-3'>
            <div></div>
            <AppButton type='submit' styles='bg-green-400 col-span-2'>
              Add Person
            </AppButton>
          </div>
        </form>
      </section>

      {peopleData && peopleData.persons?.length > 0 && (
        <section className=' max-w-sm mx-auto border border-sky-500 border-solid p-5 mb-10'>
          <Heading text='Add Car' />
          <form className='grid gap-3 mt-4' onSubmit={onAddCar}>
            <AppInput
              label={'Year'}
              type='number'
              name={'year'}
              value={carValues.year}
              handleChange={handleCarChange}
            />
            <AppInput
              label={'Make'}
              name={'make'}
              value={carValues.make}
              handleChange={handleCarChange}
            />
            <AppInput
              label={'Model'}
              name={'model'}
              value={carValues.model}
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
              options={peopleData?.persons?.map((p) => ({
                ...p,
                label: p.firstName + ' ' + p.lastName,
                value: p.id,
              }))}
              label='Owner'
              handleChange={handleCarChange}
              name='personId'
              value={carValues.personId}
            />
            <div className='text-center grid grid-cols-3'>
              <div></div>
              <AppButton type='submit' styles='bg-green-400 col-span-2'>
                Add Car
              </AppButton>
            </div>
          </form>
        </section>
      )}

      <section className='max-w-xl mx-auto border border-sky-500 border-solid p-5'>
        <Heading text='People & Cars' />
        {peopleData && carsData && renderPersonWithCars()}
      </section>
    </div>
  );
};
