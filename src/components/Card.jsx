import React from 'react';

/**
 * Компонент ігрової картки.
 * Відповідає за відображення однієї картки на ігровому полі, анімацію її перевертання та стан збігу.
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {Object} props.item - Об'єкт з даними картки (інформація про персонажа).
 * @param {string} props.item.content - URL зображення персонажа.
 * @param {string} props.item.name - Ім'я персонажа (використовується для alt-тексту зображення).
 * @param {boolean} props.isFlipped - Прапорець: чи перевернута картка лицьовою стороною догори.
 * @param {boolean} props.isMatched - Прапорець: чи знайдена вже пара для цієї картки.
 * @param {Function} props.onClick - Функція-обробник, яка викликається при кліку на картку.
 * @returns {JSX.Element} Візуальне представлення ігрової картки.
 */
const Card = ({ item, isFlipped, isMatched, onClick }) => {
    return (
        <div 
            className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">
                    <img src={item.content} alt={item.name} />
                </div>
            </div>
        </div>
    );
};
 
export default Card;