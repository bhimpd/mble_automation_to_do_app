import { faker } from '@faker-js/faker';

export function generateTaskName(): string {
    return `Buy ${faker.commerce.product()}`;
}