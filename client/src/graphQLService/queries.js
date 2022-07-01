import { gql } from '@apollo/client';

export const GET_PERSON_WITH_CARS = gql`
  query getPersonWithCars($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
    }
    carsByPersonId(personId: $id) {
      id
      year
      model
      price
      make
      personId
    }
  }
`;

export const GET_CARS = gql`
  query getCars {
    cars {
      id
      year
      model
      price
      make
      personId
    }
  }
`;

export const GET_PEOPLE = gql`
  query getPeople {
    persons {
      id
      firstName
      lastName
    }
  }
`;

export const GET_PERSON = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
    }
  }
`;