import { useForm } from "react-hook-form";

const StartPage = ({ onStart }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Передаємо дані (ім'я та складність) в App
        onStart(data);
    };

    return (
        <div className="page start-page">
            <h1>🧠 Memory Game</h1>
            <p className="subtitle">Тренуй свою пам'ять!</p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
                <div className="form-group">
                    <label>Ім'я гравця:</label>
                    <input 
                        {...register("username", { required: "Введіть ім'я!" })} 
                        placeholder="Ваше ім'я..."
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="form-group">
                    <label>Рівень складності:</label>
                    <select {...register("difficulty")}>
                        <option value="6">Новачок (12 карток)</option>
                        <option value="8">Аматор (16 карток)</option>
                        <option value="12">Профі (24 картки)</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary">Почати гру 🚀</button>
            </form>
        </div>
    );
};

export default StartPage;