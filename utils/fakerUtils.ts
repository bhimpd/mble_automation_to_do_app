import { faker } from '@faker-js/faker';

export function generateTaskName(): string {
    return `Buy ${faker.commerce.product()}`;
}

export function generateListName(): string {
    // Generates something like "My Fresh List" or "My Electronics List"
    return `My ${faker.commerce.department()} List`;
}