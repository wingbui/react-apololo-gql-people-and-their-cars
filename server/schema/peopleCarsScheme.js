import { default as find } from 'lodash/find.js';
import { default as remove } from 'lodash/remove.js';
import { default as filter } from 'lodash/remove.js';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { v4 as uuidv4 } from 'uuid';

let people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates',
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs',
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds',
  },
];

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1',
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1',
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1',
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2',
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2',
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2',
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3',
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3',
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3',
  },
];

const Person = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

const Car = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: { type: GraphQLID },
    year: { type: GraphQLID },
    make: { type: GraphQLID },
    model: { type: GraphQLID },
    price: { type: GraphQLID },
    personId: { type: GraphQLID },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    person: {
      type: Person,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return find(people, { id: args.id });
      },
    },
    persons: {
      type: new GraphQLList(Person),
      resolve(parent, args) {
        return people;
      },
    },
    car: {
      type: Car,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return find(cars, { id: args.id });
      },
    },
    cars: {
      type: new GraphQLList(Car),
      resolve(parent, args) {
        return cars;
      },
    },
    carsByPersonId: {
      type: new GraphQLList(Car),
      args: { personId: { type: GraphQLID } },
      resolve(parent, args) {
        return filter(cars, { personId: args.personId });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: Person,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const person = { ...args, id: uuidv4() };
        people.push(person);

        return person;
      },
    },
    deletePerson: {
      type: Person,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        const person = find(people, { id: args.id });
        if (!person) {
          throw new Error(`Could not find person with id ${args.id}}`);
        }
        remove(people, { id: args.id });
        remove(cars, { personId: args.id });

        return { ...person, cars: cars };
      },
    },
    updatePerson: {
      type: Person,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const person = find(people, {
          id: args.id,
        });
        if (!person) {
          throw new Error(`Could not find person with id ${args.id}}`);
        }
        person.firstName = args.firstName;
        person.lastName = args.lastName;

        return person;
      },
    },
    addCar: {
      type: Car,
      args: {
        year: { type: new GraphQLNonNull(GraphQLString) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        personId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const car = { ...args, id: uuidv4() };
        cars.push(car);
        return car;
      },
    },
    deleteCar: {
      type: Car,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        const car = find(cars, { id: args.id });
        if (!car) {
          throw new Error(`Could not find car with id ${args.id}}`);
        }
        remove(cars, { id: args.id });
        return car;
      },
    },
    updateCar: {
      type: Car,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        personId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const car = find(cars, {
          id: args.id,
        });
        if (!car) {
          throw new Error(`Could not find car with id ${args.id}}`);
        }
        car.year = args.year;
        car.make = args.make;
        car.model = args.model;
        car.price = args.price;
        car.personId = args.personId;

        return car;
      },
    },
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
