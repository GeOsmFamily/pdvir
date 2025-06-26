import office_banner_1 from '@/assets/images/third-place/office-banner-1.jpg'
import office_1 from '@/assets/images/third-place/office-1.jpg'
import office_2 from '@/assets/images/third-place/office-2.jpg'
import office_3 from '@/assets/images/third-place/office-3.jpg'
import office_4 from '@/assets/images/third-place/office-4.jpg'
import office_5 from '@/assets/images/third-place/office-5.jpg'

export interface ThirdPlaceRoom {
  title: string
  description: string
  image: { src: string; size: number }
}

export const thirdPlaceRooms: ThirdPlaceRoom[] = [
  {
    title: 'Image Room #1',
    description:
      "GéoVoirie est une solution cartographique innovante dédiée à la gestion et au suivi de la voirie communale et intercommunale. Ce Web-SIG permet de consulter, mettre à jour et analyser l'état des voiries, planifier des travaux et gérer les budgets associés.\n\nIntuitif et ergonomique, il propose des outils modernes de navigation cartographique et d'édition, facilitant ainsi le travail des services techniques et des décideurs territoriaux.",
    image: { src: office_3, size: 35 }
  },
  {
    title: 'Image Room #2',
    description:
      "Le module permet d'organiser et de suivre les travaux de voirie en intégrant la gestion financière. Chaque chantier est localisé sur la carte et dispose d'une fiche récapitulative : budget prévisionnel, coûts engagés, entreprises intervenantes et phase d'avancement.\n\nDes bordereaux de prix pré-paramétrés facilitent la saisie et le calcul des budgets, assurant ainsi un contrôle budgétaire efficace à chaque étape.",
    image: { src: office_4, size: 100 }
  },
  {
    title: 'Image Room #3',
    description:
      "GéoVoirie est conçu pour s'intégrer à d'autres systèmes géographiques via des services Web (WMS/WFS). Les référentiels de voirie sont diffusés en temps réel et consultables depuis des plateformes partenaires ou nationales.\n\nLes utilisateurs peuvent également ajouter des fonds de plan variés (Google Maps, OpenStreetMap, BD Ortho…) pour enrichir leurs analyses et prises de décision.",
    image: { src: office_5, size: 100 }
  }
]

export const carouselBanner = [office_banner_1]

export const galleryImages = [office_1, office_2, office_3, office_4, office_5]
