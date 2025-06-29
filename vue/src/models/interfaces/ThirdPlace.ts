import office_banner_1 from '@/assets/images/third-place/office-banner-1.jpg'
import dcs_1 from '@/assets/images/third-place/dcs-1.jpg'
import dcs_3 from '@/assets/images/third-place/dcs-3.jpg'
import dcs_4 from '@/assets/images/third-place/dcs-4.jpg'
import dcs_5 from '@/assets/images/third-place/dcs-5.jpg'
import dcs_6 from '@/assets/images/third-place/dcs-6.jpg'
import dcs_7 from '@/assets/images/third-place/dcs-7.jpg'
import dcs_8 from '@/assets/images/third-place/dcs-8.jpg'
import dcs_11 from '@/assets/images/third-place/dcs-11.jpg'
import dcs_14 from '@/assets/images/third-place/dcs-14.jpg'
import dcs_9 from '@/assets/images/third-place/dcs-9.jpg'
import dcs_10 from '@/assets/images/third-place/dcs-10.jpg'
import dcs_2 from '@/assets/images/third-place/dcs-2.jpg'

export interface ThirdPlaceRoom {
  title: string
  description: string
  image: { src: string; size: number }
}

export const thirdPlaceRooms: ThirdPlaceRoom[] = [
  {
    title: 'Diver City Space',
    description: `Financé par l’Union européenne et mis en œuvre par Expertise France, le projet Plateforme Urbaine accompagne le Cameroun dans l’amélioration des politiques publiques en matière d’aménagement du territoire.

L’Union européenne, partenaire de longue date, intervient dans les domaines de l’éducation, de la santé, de la gouvernance et des infrastructures. Expertise France, agence publique de coopération technique internationale, agit aux côtés des autorités camerounaises pour renforcer les politiques urbaines durables et inclusives.
    
Le projet, doté d’un budget de 4,9 millions d’euros (3,214 milliards de FCFA), est prévu de janvier 2023 à décembre 2026.`,
    image: { src: dcs_2, size: 35 }
  },
  {
    title: 'Contexte et Objectifs',
    description: `Le Cameroun, locomotive économique de l’Afrique Centrale, fait face à une urbanisation rapide mais insuffisamment maîtrisée, entraînant précarité et détérioration des services urbains. Pour répondre à ces défis, le pays a adopté une stratégie de développement urbain durable inscrite dans le Programme Indicatif Multi-annuel (PIM) 2021-2027, soutenu par l’Union européenne.

Objectif général : Améliorer les politiques publiques d’aménagement du territoire pour des villes durables et inclusives.

Objectifs spécifiques : Renforcer les mécanismes de gestion du territoire et de planification urbaine. Améliorer l’accessibilité et la connaissance des données urbaines, en intégrant les enjeux d’inclusion et de résilience.`,
    image: { src: dcs_7, size: 100 }
  },
  {
    title: 'Activités et Bénéficiaires',
    description: `Le projet s’articule autour de deux composantes :

Composante 1 : Animation d’une plateforme nationale d’acteurs du développement urbain. Révision du cadre normatif et élaboration de guides de planification urbaine. Renforcement des compétences techniques des acteurs locaux. Organisation d’échanges thématiques et sensibilisation des usagers de l’urbain.

Composante 2 : Création d’une base de données des documents de planification. Appui à la production et à l’accessibilité des données territoriales.

Bénéficiaires : Ministère de l’Habitat et du Développement Urbain. Ministère de la Décentralisation et du Développement Local. Ministère des Domaines, du Cadastre et des Affaires Foncières. Ministère de l’Économie, de la Planification et de l’Aménagement du Territoire.`,
    image: { src: dcs_14, size: 100 }
  }
]

export const carouselBanner = [office_banner_1, dcs_14, dcs_9, dcs_10, dcs_2]

export const galleryImages = [
  dcs_1,
  dcs_2,
  dcs_3,
  dcs_4,
  dcs_5,
  dcs_6,
  dcs_7,
  dcs_8,
  dcs_9,
  dcs_10,
  dcs_11,
  // dcs_12,
  // dcs_13,
  dcs_14
]
