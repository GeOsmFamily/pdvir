import { fr, fakerFR } from '@faker-js/faker';
import type { Actor } from "@/models/interfaces/Actor";
import { AdministrativesScopes } from '@/models/enums/contents/AdministrativesScopes';
import { ActorsCategories } from '@/models/enums/contents/actors/ActorsCategories';
import { ActorsExpertises } from '@/models/enums/contents/actors/ActorsExpertises';
import { ActorsThematics } from '@/models/enums/contents/actors/ActorsThematics';

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
    createdBy: fakerFR.number.int(),  // Assurez-vous que ce champ correspond bien à `User["id"]`
    isValidated: fakerFR.datatype.boolean(),
    name: fakerFR.company.name(),
    acronym: fakerFR.lorem.word().toUpperCase().substring(0, Math.floor(Math.random() * 6) + 1),
    categories: fakerFR.helpers.arrayElements(Object.values(ActorsCategories), 2),  // Génère une catégorie aléatoire
    expertises: fakerFR.helpers.arrayElements(Object.values(ActorsExpertises), 2),  // Génère une expertise aléatoire
    thematics: fakerFR.helpers.arrayElements(Object.values(ActorsThematics), 2),  // Génère 2 thématiques aléatoires
    creationDate: fakerFR.date.past(),
    lastUpdate: fakerFR.date.recent(),
    description: fakerFR.lorem.paragraph(),
    administrativeScopes: fakerFR.helpers.arrayElements(Object.values(AdministrativesScopes), 2),  // Génère 2 zones administratives aléatoires
    officeName: fakerFR.company.name(),
    officeAddress: fakerFR.address.streetAddress(),
    officeLocation: [fakerFR.location.longitude(), fakerFR.location.latitude()],
    contactName: fakerFR.person.firstName() + " " + fakerFR.person.lastName(),
    contactPosition: fakerFR.name.jobTitle(),
    projects: fakerFR.helpers.arrayElements([fakerFR.lorem.words(3), fakerFR.lorem.words(4), fakerFR.lorem.words(2)]),  // Génère une liste de projets
    logo: fakerFR.image.url({ height: 180, width: 180 }),
    images: fakerFR.helpers.arrayElements([fakerFR.image.url(), fakerFR.image.url(), fakerFR.image.url()]),  // Génère des URLs d'images aléatoires
    website: fakerFR.internet.url(),
    phone: fakerFR.phone.number(),
    email: fakerFR.internet.email(),
  };
}


function generateActors(count: number): Actor[] {
  return Array.from({ length: count }, generateActor);
}
