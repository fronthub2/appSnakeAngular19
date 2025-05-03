export interface IMenu {
  link: string;
  title: string;
  icon: string;
}

export const sidenavMenu: IMenu[] = [
  {
    link: '/home',
    title: 'home',
    icon: 'home',
  },
  {
    link: '/games',
    title: 'games',
    icon: 'sports_esports',
  },
  {
    link: '/login',
    title: 'log out',
    icon: 'logout',
  }
];
