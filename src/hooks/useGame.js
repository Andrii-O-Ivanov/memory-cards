import { useState, useEffect } from 'react';

const EMOJIS = ['💻', '🖥️', '💾', '🖱️', '🔋', '📱', '📡', '🕹️'];

export const useGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]); // ID відкритих карток (макс 2)
    const [matchedCards, setMatchedCards] = useState([]); // ID вже знайдених пар
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [moves, setMoves] = useState(0);

    const startGame = () => {
        // Створюємо пари карток та перемішуємо масив
        const shuffledCards = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));

        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setIsGameFinished(false);
    };

    const handleCardClick = (id) => {
        // Блокуємо клік, якщо вже відкрито дві картки або клікнули на ту ж саму
        if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) {
            return;
        }

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        // Логіка перевірки пари
        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            const firstCard = cards.find(card => card.id === newFlipped[0]);
            const secondCard = cards.find(card => card.id === newFlipped[1]);

            if (firstCard.emoji === secondCard.emoji) {
                // Пара співпала - зберігаємо в matched
                setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
                setFlippedCards([]); 
            } else {
                // Не вгадав - закриваємо через секунду
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    // Перевіряємо, чи всі пари знайдено
    useEffect(() => {
        if (cards.length > 0 && matchedCards.length === cards.length) {
            setIsGameFinished(true);
        }
    }, [matchedCards, cards]);

    useEffect(() => {
        startGame();
    }, []);

    return {
        cards,
        flippedCards,
        matchedCards,
        handleCardClick,
        isGameFinished,
        moves,
        restartGame: startGame
    };
};