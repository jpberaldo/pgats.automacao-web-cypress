import { faker } from '@faker-js/faker';


export function getTimestamp() {

    return new Date().getTime();

};

export function getRandomEmail() {

    return `jp-test-qa-${getTimestamp()}@test.com`;
};

export function getRandomName() {

    return faker.person.firstName();
};