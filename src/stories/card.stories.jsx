import Card from '../components/Card';

export default {
  title: 'Game/Card',
  component: Card,
  tags: ['autodocs'],
  // Ця штука додасть контейнер навколо картки, щоб вона не була гігантською
  decorators: [
    (Story) => (
      <div style={{ width: '150px', height: '200px', margin: '50px auto' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

// ... решта коду (Hidden, Flipped, Matched) залишається без змін

// Стан: Картка сорочкою догори
export const Hidden = {
  args: {
    item: {
      name: 'Rick Sanchez',
      content: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    isFlipped: false,
    isMatched: false,
  },
};

// Стан: Картка перевернута (видно картинку)
export const Flipped = {
  args: {
    ...Hidden.args,
    isFlipped: true,
  },
};

// Стан: Пару знайдено
export const Matched = {
  args: {
    ...Hidden.args,
    isFlipped: true,
    isMatched: true,
  },
};