import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'categorie',
    icon: 'nb-home',
    home: true,
    children:[
      {
        title:"liste",
        link: '/pages/categorie',

      },
        {
        title: "Sous categorie",
        link: '/pages/sous',
      },
    ],
  },

  {
    title: 'Test',
    icon: 'nb-e-commerce',
    link: '/pages/test',
    home: true,
    children: [
      {
        title: 'liste',
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

        title: 'Ecole',
        icon: 'ion-bookmark',
        link: '/pages/ecole',
        home: true,

      },
      {
        title: 'Class',
        icon: 'nb-compose',
        link: '/pages/class',
        home: true,
      },
      {
        title: 'Etalonnage',
        icon: 'nb-help',
        link: '/pages/etalonnage',
        home: true,
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },

];
