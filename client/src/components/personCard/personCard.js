import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AppInput } from '../appInput/AppInput';
import { Link } from 'react-router-dom';
import { AppButton } from '../appButton/AppButton';
import { GET_PEOPLE } from '../../graphQLService/queries';
import { DELETE_PERSON, UPDATE_PERSON } from '../../graphQLService/mutations';

export const PersonCard = ({ person, children }) => {
  const [personValues, setPersonValues] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    variables: { id: person.id },
    update(cache, { data: { deletePerson } }) {
      const { persons } = cache.readQuery({ query: GET_PEOPLE });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          persons: persons.filter((person) => person.id !== deletePerson.id),
        },
      });
    },
  });

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    variables: {
      id: person.id,
      firstName: personValues.firstName,
      lastName: personValues.lastName,
    },
    refetchQueries: [{ query: GET_PEOPLE, variables: { id: person.id } }],
  });

  const handlePersonChange = (e) => {
    setPersonValues({ ...personValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!personValues.lastName || !personValues.firstName) {
      alert('Please enter all the fields');
    }
    updatePerson();
    setIsUpdating(false);
  };

  if (isUpdating) {
    return (
      <div>
        <h3 className='bg-indigo-500 p-1 text-white'>
          {personValues.firstName} {personValues.lastName}
        </h3>

        <form onSubmit={onSubmit} className='grid gap-3 mt-4'>
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
          <div className='grid grid-cols-2'>
            <AppButton type='submit' styles='bg-amber-400'>
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
  } else {
    return (
      <div className='border'>
        <h3 className='bg-indigo-500 p-1 text-white'>
          {person.firstName} {person.lastName}
        </h3>

        {children}

        <div className='border grid grid-cols-3'>
          <button
            className='bg-amber-400 p-2'
            onClick={() => {
              setIsUpdating(true);
            }}
          >
            Edit
          </button>
          <AppButton onClick={deletePerson} styles={'bg-red-400'}>
            Delete
          </AppButton>
          <Link
            className='flex justify-center items-center bg-green-400'
            to={`/people/${person.id}`}
          >
            Learn more
          </Link>
        </div>
      </div>
    );
  }
};
