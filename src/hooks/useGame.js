import { useState, useEffect } from 'react';

// Великий набір емодзі, щоб вистачило на складний рівень
const EMOJIS = [
    '💻', '🖥️', '⌨️', '🖱️', '📱', '🔋', '🔌', '💾', 
    '💿', '📀', '🎥', '📷', '📹', '📽️', '📡', '🔭', 
    '🔬', '💡', '🔦', '⏰', '⌚', '🕹️', '🎲', '🧩'
];

export const useGame = (settings) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [moves, setMoves] = useState(0);

    const startGame = () => {
        // Отримуємо кількість пар з налаштувань (або 8 за замовчуванням)
        const pairsCount = settings ? Number(settings.difficulty) : 8;
        
        // Беремо потрібну кількість унікальних іконок
        const selectedEmojis = EMOJIS.slice(0, pairsCount);

        // Створюємо пари
        const deck = [...selectedEmojis, ...selectedEmojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));

        setCards(deck);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setIsGameFinished(false);
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            const card1 = cards.find(c => c.id === newFlipped[0]);
            const card2 = cards.find(c => c.id === newFlipped[1]);

            if (card1.emoji === card2.emoji) {
                setMatchedCards(prev => [...prev, card1.id, card2.id]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    useEffect(() => {
        if (cards.length > 0 && matchedCards.length === cards.length) {
            setIsGameFinished(true);
        }
    }, [matchedCards, cards]);

    // Перезапуск при зміні налаштувань
    useEffect(() => {
        startGame();
    }, [settings]);

    return { cards, flippedCards, matchedCards, handleCardClick, isGameFinished, moves, restartGame: startGame };
};