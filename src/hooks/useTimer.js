import { useState, useEffect, useRef } from 'react';

/**
 * Кастомний React-хук для управління ігровим таймером.
 * Надає функціонал для запуску, зупинки, скидання та форматування часу.
 *
 * @function useTimer
 * @returns {Object} Об'єкт зі станом та методами керування таймером.
 * @property {number} seconds - Поточна кількість пройдених секунд.
 * @property {Function} startTimer - Запускає відлік часу.
 * @property {Function} stopTimer - Зупиняє (ставить на паузу) відлік часу.
 * @property {Function} resetTimer - Зупиняє таймер та скидає секунди до нуля.
 * @property {Function} formatTime - Повертає час у відформатованому вигляді `MM:SS`.
 */
export const useTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    /**
     * Форматує поточну кількість секунд у зручний для читання рядок.
     * @returns {string} Час у форматі "хвилини:секунди" (наприклад, "02:05").
     */
    const formatTime = () => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        return `${getMinutes}:${getSeconds}`;
    };

    return { seconds, startTimer, stopTimer, resetTimer, formatTime };
};