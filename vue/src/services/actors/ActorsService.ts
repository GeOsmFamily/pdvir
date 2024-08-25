import { fr, fakerFR } from '@faker-js/faker';
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
    id: fakerFR.string.uuid(),
    name: fakerFR.company.name(),
    acronym: fakerFR.lorem.word().toUpperCase().substring(0, Math.floor(Math.random() * 6) + 1),
    type_id: fakerFR.number.int({ min: 1, max: 10 }),
    country_id: fakerFR.number.int({ min: 1, max: 195 }),
    foundation_date: fakerFR.date.past(),
    description: fakerFR.lorem.paragraph(),
    logo: fakerFR.image.url({ height: 180, width: 180 }),
    contact_name: fakerFR.person.fullName(),
    contact_picture: fakerFR.image.avatar(),
    phone: fakerFR.phone.number(),
    address: fakerFR.location.streetAddress(),
    email: fakerFR.internet.email(),
    website: fakerFR.internet.url(),
    fb: `https://facebook.com/${fakerFR.internet.userName()}`,
    linkedin: `https://linkedin.com/in/${fakerFR.internet.userName()}`,
    twitter: `https://twitter.com/${fakerFR.internet.userName()}`,
    instagram: `https://instagram.com/${fakerFR.internet.userName()}`,
    latitude: fakerFR.location.latitude(),
    longitude: fakerFR.location.longitude(),
    active: fakerFR.datatype.boolean(),
    closing_date: fakerFR.datatype.boolean() ? fakerFR.date.future() : null,
    last_update: fakerFR.date.recent(),
    reference: fakerFR.lorem.words(5)
  };
}

function generateActors(count: number): Actor[] {
  return Array.from({ length: count }, generateActor);
}
