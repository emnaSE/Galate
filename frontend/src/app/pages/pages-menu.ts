import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
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
        title: 'Liste des tests ',
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
        title:"Categorie",
        link: '/pages/categorie',

      },

      {

        title: 'Ecole',
        //icon: 'ion-bookmark',
        link: '/pages/ecole',
        //home: true,

      },
      {
        title: 'Class',
        //icon: 'nb-compose',
        link: '/pages/class',
        //home: true,
      },
      {
        title: 'Etalonnage',
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
