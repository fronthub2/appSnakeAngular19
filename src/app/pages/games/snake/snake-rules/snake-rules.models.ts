export interface Item<T> {
  name: string;
  label: string;
  value: T[];
}

export interface Food {
  name: string;
  icon: string;
}

export const SnakeRules: (Item<string> | Item<Food>)[] = [
  {
    name: 'speed',
    label: 'Speed',
    value: ['0.05', '0.1', '0.2', '0.3'],
  },
  {
    name: 'color',
    label: 'Color',
    value: ['red', 'blue', 'black', 'green'],
  },
  {
    name: 'food',
    label: 'Food',
    value: [
      { name: 'burger', icon: '🍔' },
      { name: 'cocos', icon: '🥥' },
    ],
  },
];
