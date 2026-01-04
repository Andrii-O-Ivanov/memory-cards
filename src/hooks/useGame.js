import { useState, useEffect } from 'react';

export const useGame = (settings) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isGameFinished, setIsGameFinished] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const startGame = async () => {
        setIsLoading(true);
        setError(null);
        setIsGameFinished(false);
        setMoves(0);
        setMatchedCards([]);
        setFlippedCards([]);
        setCards([]);

        try {
            const pairsCount = settings ? Number(settings.difficulty) : 8;
            
            // Робимо запит на сервер (беремо випадкову сторінку, щоб персонажі були різні)
            const randomPage = Math.floor(Math.random() * 30) + 1;
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${randomPage}`);
            
            if (!response.ok) throw new Error('Не вдалося завантажити дані');
            
            const data = await response.json();

            // 2. Беремо потрібну кількість персонажів з отриманих даних
            const initialItems = data.results.slice(0, pairsCount);

            // 3. Формуємо пари (кожен персонаж двічі)
            const deck = [...initialItems, ...initialItems]
                .sort(() => Math.random() - 0.5)
                .map((item, index) => ({
                    id: index,
                    content: item.image, 
                    name: item.name      
                }));

            setCards(deck);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            const card1 = cards.find(c => c.id === newFlipped[0]);
            const card2 = cards.find(c => c.id === newFlipped[1]);

            if (card1.content === card2.content) {
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

    useEffect(() => {
        startGame();
    }, [settings]);

    return { 
        cards, 
        flippedCards, 
        matchedCards, 
        handleCardClick, 
        isGameFinished, 
        moves, 
        restartGame: startGame,
        isLoading, 
        error     
    };
};