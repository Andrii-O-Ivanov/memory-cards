import Modal from '../components/Modal';
import React from 'react';

export default {
  title: 'Game/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

// Варіація 1: Вікно перемоги
export const VictoryModal = {
  args: {
    isOpen: true,
    children: (
      <div style={{ textAlign: 'center' }}>
        <h2>🎉 Перемога! 🎉</h2>
        <p>Ви знайшли всі пари!</p>
        <button className="btn-primary">Грати знову</button>
      </div>
    ),
  },
};

// Варіація 2: Інформаційне вікно
export const InfoModal = {
  args: {
    isOpen: true,
    children: (
      <div>
        <h3>Правила гри</h3>
        <ul>
          <li>Шукайте однакові картки</li>
          <li>Виграйте за мінімальну кількість ходів</li>
        </ul>
      </div>
    ),
  },
};