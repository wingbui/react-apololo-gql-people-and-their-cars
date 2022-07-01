import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatter } from '../../utils';
import { Heading } from '../../heading/Heading';
import { AppButton } from '../../components/appButton/AppButton';
import { GET_PERSON_WITH_CARS } from '../../graphQLService/queries';

export const Person = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: personWithCars } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  if (personWithCars) {
    return (
      <div className='max-w-xl mx-auto border gap-3 grid border-sky-500 border-solid p-5'>
        <Heading
          text={`${personWithCars.person.firstName} ${personWithCars.person.lastName}`}
        />
        {personWithCars.carsByPersonId.map((car) => (
          <ul className='grid gap-3 border border-sky-400 p-1' key={car.id}>
            <li className='bg-sky-400 p-3'>{car.model}</li>
            <li>{car.make}</li>
            <li>{car.year}</li>
            <li>{formatter.format(car.price)}</li>
          </ul>
        ))}
        <AppButton onClick={() => navigate(-1)} styles='bg-green-400'>
          Go Back
        </AppButton>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};
