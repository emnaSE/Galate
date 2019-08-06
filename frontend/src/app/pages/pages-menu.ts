import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [


  {
    title: 'tableau de bord',
    icon: 'nb-home',
    link: '/pages/stat',
    home: true,

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
      {
        title: 'Liste des questions ',
        link: '/pages/question',
      },

    ],
  },


  {
    title: 'Parametre',
    icon: 'nb-cloudy',
    home: true,
    children:[
      {
        title:"Liste des Categories",
        link: '/pages/categorie',

      },
      {
        title:"Liste des Critères",
        link: '/pages/sous',

      },
      {
        title:"Liste des Compétences",
        link: '/pages/criterion',

      },

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
