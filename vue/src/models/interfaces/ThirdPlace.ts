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
    description:
      "GéoVoirie est une solution cartographique innovante dédiée à la gestion et au suivi de la voirie communale et intercommunale. Ce Web-SIG permet de consulter, mettre à jour et analyser l'état des voiries, planifier des travaux et gérer les budgets associés.\n\nIntuitif et ergonomique, il propose des outils modernes de navigation cartographique et d'édition, facilitant ainsi le travail des services techniques et des décideurs territoriaux.",
    image: { src: dcs_2, size: 35 }
  },
  {
    title: 'Ville Inclusive Durable',
    description:
      "Le module permet d'organiser et de suivre les travaux de voirie en intégrant la gestion financière. Chaque chantier est localisé sur la carte et dispose d'une fiche récapitulative : budget prévisionnel, coûts engagés, entreprises intervenantes et phase d'avancement.\n\nDes bordereaux de prix pré-paramétrés facilitent la saisie et le calcul des budgets, assurant ainsi un contrôle budgétaire efficace à chaque étape.",
    image: { src: dcs_7, size: 100 }
  },
  {
    title: 'Diver City Space',
    description:
      "GéoVoirie est conçu pour s'intégrer à d'autres systèmes géographiques via des services Web (WMS/WFS). Les référentiels de voirie sont diffusés en temps réel et consultables depuis des plateformes partenaires ou nationales.\n\nLes utilisateurs peuvent également ajouter des fonds de plan variés (Google Maps, OpenStreetMap, BD Ortho…) pour enrichir leurs analyses et prises de décision.",
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
