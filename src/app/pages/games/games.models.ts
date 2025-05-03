export interface IGame {
  title: string;
  link: string;
  img: string;
  class: string;
  reliese: boolean;
}

export const GameItems: IGame[] = [
  {
    title: 'Snake',
    link: '/games/snake-rules',
    img: 'snake',
    class: 'col-span-1 row-span-1 col-start-9 row-start-5',
    reliese: true,
  },
  {
    title: 'Pacman',
    link: '',
    img: 'pacman',
    class: 'col-span-1 row-span-1 col-start-3 row-start-2',
    reliese: false,
  },
  {
    title: 'Mario',
    link: '',
    img: 'mario',
    class: 'col-span-1 row-span-1 col-start-2 row-start-3',
    reliese: false,
  },
  {
    title: 'CrossCicle',
    link: '',
    img: 'cross_cicle',
    class: 'col-span-1 row-span-1 col-start-7 row-start-2',
    reliese: false,
  },
  {
    title: 'Tetris',
    link: '',
    img: 'tetris',
    class: 'col-span-1 row-span-1 col-start-5 row-start-4',
    reliese: false,
  },
];
