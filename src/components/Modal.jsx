import ReactDOM from 'react-dom';
import '../index.css';

/**
 * Компонент модального вікна, який рендериться через React Portal.
 * Використовується для відображення важливих повідомлень (наприклад, про перемогу) поверх усього іншого контенту.
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {boolean} props.isOpen - Прапорець, що визначає, чи відкрите модальне вікно.
 * @param {React.ReactNode} props.children - Вкладені елементи (контент), які будуть відображені всередині модального вікна.
 * @returns {React.ReactPortal|null} Повертає React Portal з модальним вікном, або null, якщо `isOpen` є false.
 */
const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;