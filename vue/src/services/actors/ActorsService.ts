import { faker } from '@faker-js/faker';
import type { Actor } from "@/models/interfaces/Actor";

export class ActorsService {
    static async getActors(): Promise<Actor[]> {
        return generateActors(20);
    }
}

//////////////////////////////////////////////////////////////////////////////
// TEMP CODE TO REMOVE ONCE API IS IMPLEMENTED
//////////////////////////////////////////////////////////////////////////////

function generateActor(): Actor {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    acronym: faker.lorem.word().toUpperCase().substring(0, 3),
    type_id: faker.number.int({ min: 1, max: 10 }),
    country_id: faker.number.int({ min: 1, max: 195 }),
    foundation_date: faker.date.past(),
    description: faker.lorem.paragraph(),
    logo: faker.image.url(),
    contact_name: faker.person.fullName(),
    contact_picture: faker.image.avatar(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    fb: `https://facebook.com/${faker.internet.userName()}`,
    linkedin: `https://linkedin.com/in/${faker.internet.userName()}`,
    twitter: `https://twitter.com/${faker.internet.userName()}`,
    instagram: `https://instagram.com/${faker.internet.userName()}`,
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    active: faker.datatype.boolean(),
    closing_date: faker.datatype.boolean() ? faker.date.future() : null,
    last_update: faker.date.recent(),
    reference: faker.lorem.words(5)
  };
}

function generateActors(count: number): Actor[] {
  return Array.from({ length: count }, generateActor);
}
