import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Categories',
    icon: 'nb-home',
    home: true,
    children:[
      {
        title:"Liste des Catégories",
        link: '/pages/categorie',

      },
        {
        title: "Liste des Sous Catégorie",
        link: '/pages/sous',
      },
    ],
  },

  {
    title: 'Tests',
    icon: 'nb-e-commerce',
    link: '/pages/test',
    home: true,
    children: [
      {
        title: 'Liste des Tests',
        link: '/pages/test',
      },

    ],
  },


  {
    title: 'Configuration',
    icon: 'nb-cloudy',
    home: true,
    children:[
      {

        title: 'Liste des Ecoles',
        //icon: 'ion-bookmark',
        link: '/pages/ecole',
        //home: true,

      },
      {
        title: 'Liste des Classes',
        //icon: 'nb-compose',
        link: '/pages/class',
        //home: true,
      },
      {
        title: 'Liste des Etalonnages',
        //icon: 'nb-help',
        link: '/pages/etalonnage',
        //home: true,
      },
    ],
  },
  {
    title: '',
    group: true,
  },

];
