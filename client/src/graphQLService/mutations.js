import { gql } from '@apollo/client';


const ADD_CAR = gql`
  mutation addCar(
    $year: String!
    $model: String!
    $price: String!
    $make: String!
    $personId: ID!
  ) {
    addCar(
      year: $year
      model: $model
      price: $price
      make: $make
      personId: $personId
    ) {
      id
      year
      model
      price
      make
      personId
    }
  }
`;

const UPDATE_CAR = gql`
  mutation updateCar(
    $id: ID!
    $year: String!
    $model: String!
    $price: String!
    $make: String!
    $personId: ID!
  ) {
    updateCar(
      id: $id
      year: $year
      model: $model
      price: $price
      make: $make
      personId: $personId
    ) {
      id
      year
      model
      price
      make
      personId
    }
  }
`;

const DELETE_CAR = gql`
  mutation deleteCar($id: ID!) {
    deleteCar(id: $id) {
      year
      model
      price
      make
      personId
    }
  }
`;

const ADD_PERSON = gql`
  mutation addPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_PERSON = gql`
  mutation updatePerson($id: ID!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const DELETE_PERSON = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export {
  DELETE_CAR,
  ADD_CAR,
  UPDATE_CAR,
  DELETE_PERSON,
  ADD_PERSON,
  UPDATE_PERSON,
};
