import { login } from "../../entities/auth";

// NB: если я выношу использую в этих фнкциях такие события как FormEvent, то они перестают быть чистыми функциями
export const handleLoginSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string,
    dispatch: AppDispatch,
    navigate: (path: string) => void,
    setError: (error: string | null) => void,
) => {
    e.preventDefault();
    setError(null);
    try {
        await dispatch(login({ email, password })).unwrap();
        navigate('/');
    } catch (err: unknown) {
        setError(typeof err === 'string' ? err : 'Unknown error');
    }
}