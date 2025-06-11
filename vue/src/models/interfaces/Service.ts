export interface Service {
  to: string
  title: string
  isExpanded: boolean
  contents: ServiceContent[]
}

export interface ServiceContent {
  title: string
  description: string
  image: string
}

export const ServiceDatas: Service[] = [
  {
    isExpanded: true,
    title: 'Module Voirie',
    to: 'https://www.google.com',
    contents: [
      {
        title: 'Présentation générale',
        description:
          "GéoVoirie est une solution cartographique innovante dédiée à la gestion et au suivi de la voirie communale et intercommunale. Ce Web-SIG permet de consulter, mettre à jour et analyser l'état des voiries, planifier des travaux et gérer les budgets associés.\n\nIntuitif et ergonomique, il propose des outils modernes de navigation cartographique et d'édition, facilitant ainsi le travail des services techniques et des décideurs territoriaux.",
        image: '@/assets/images/Logo.png'
      },
      // {
      //   title: 'Fonctionnalités principales',
      //   description:
      //     'GéoVoirie offre un large éventail de fonctionnalités : \n\n- Visualisation du réseau de voirie à différentes échelles. \n- Modification graphique des voies : création, déplacement, suppression ou ajout de nœuds. \n- Consultation et mise à jour des fiches descriptives des voies (longueur, revêtement, historique…). \n- Gestion cartographique et budgétaire des chantiers de voirie. \n- Suivi des entreprises mandatées pour les travaux. \n- Exports de listings et états récapitulatifs des travaux réalisés et à venir.',
      //   image: '@/assets/images/Logo.png'
      // },
      {
        title: 'Gestion budgétaire et des travaux',
        description:
          "Le module permet d'organiser et de suivre les travaux de voirie en intégrant la gestion financière. Chaque chantier est localisé sur la carte et dispose d'une fiche récapitulative : budget prévisionnel, coûts engagés, entreprises intervenantes et phase d'avancement.\n\nDes bordereaux de prix pré-paramétrés facilitent la saisie et le calcul des budgets, assurant ainsi un contrôle budgétaire efficace à chaque étape.",
        image: '@/assets/images/Logo.png'
      },
      {
        title: 'Interopérabilité et échanges de données',
        description:
          "GéoVoirie est conçu pour s'intégrer à d'autres systèmes géographiques via des services Web (WMS/WFS). Les référentiels de voirie sont diffusés en temps réel et consultables depuis des plateformes partenaires ou nationales.\n\nLes utilisateurs peuvent également ajouter des fonds de plan variés (Google Maps, OpenStreetMap, BD Ortho…) pour enrichir leurs analyses et prises de décision.",
        image: '@/assets/images/Logo.png'
      }
    ]
  },
  {
    isExpanded: false,
    title: 'Module GéoRisk',
    to: 'https://www.google.com',
    contents: [
      {
        title: 'Présentation générale',
        description:
          "GéoRisk est un Système d'Information Géographique (SIG) conçu pour cartographier et analyser les zones à risques naturelles et anthropiques d'un territoire. Il centralise l'ensemble des données géographiques utiles à la prévention et à la gestion des risques : voiries, bâtiments, réseaux, services sociaux, occupation du sol… \n\nAccessible via un navigateur web, il offre aux collectivités un outil stratégique pour la sécurité et l'aménagement du territoire.",
        image: '@/assets/images/Logo.png'
      },
      // {
      //   title: 'Fonctionnalités principales',
      //   description:
      //     "Le module GéoRisk met à disposition : \n\n- Une interface cartographique interactive et intuitive. \n- Des outils de navigation : zoom, déplacement, mesure de surfaces et de distances. \n- La sélection et la consultation des zones à risques avec fiches descriptives détaillées. \n- La possibilité de dessiner des formes géométriques et d'ajouter des annotations. \n- L'ajout de couches cartographiques et de données issues de serveurs WMS externes. \n- La localisation rapide par adresse ou coordonnées.",
      //   image: '@/assets/images/Logo.png'
      // },
      {
        title: 'Impression et rapports cartographiques',
        description:
          "GéoRisk permet d'éditer des cartes à la volée, paramétrables selon les besoins des utilisateurs : choix du fond de plan, des couches affichées et de la zone géographique à imprimer. \n\nDes synthèses statistiques et des états récapitulatifs des zones à risques sont également générables pour accompagner les rapports d'études et dossiers réglementaires.",
        image: '@/assets/images/Logo.png'
      },
      {
        title: 'Gestion des thèmes et personnalisation des données',
        description:
          "Les utilisateurs peuvent activer ou désactiver des couches thématiques (zones inondables, glissements de terrain, installations à risques…) depuis l'onglet dédié. Le système prend en charge l'ajout de nouvelles couches, qu'il s'agisse d'images satellites, de plans cadastraux ou de données métiers. \n\nCette modularité permet aux collectivités d'adapter GéoRisk à leurs enjeux spécifiques et d'optimiser leur veille territoriale.",
        image: '@/assets/images/Logo.png'
      }
    ]
  }
]
