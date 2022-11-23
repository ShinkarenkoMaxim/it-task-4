import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../api';
import { Alert, AlertType } from '../../components/Alert';

export const Signup: React.FC = () => {
  const cl = {
    inputs:
      'border-2 rounded p-2 text-gray-30 hover:border-purple-500 transition outline-none focus:border-purple-500',
    submit:
      'py-2 px-4 w-full font-semibold border-2 border-transparent rounded text-lg text-white bg-purple-500 hover:border-purple-500 hover:bg-white hover:text-purple-500 transition outline-none cursor-pointer',
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e?.preventDefault();

    try {
      await signupUser({ name, email, password });
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setHasError(true);
          setAlertMessage('The User already exists.');
        }

        if (err.response?.status === 403) {
          setHasError(true);
          setAlertMessage('The user is blocked.');
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-[450px] min-h-[450px] m-24 bg-white border-solid border-2 rounded">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-10 gap-3">
          {hasError && (
            <Alert
              message={alertMessage}
              onChange={() => setHasError(false)}
              type={AlertType.error}
            />
          )}
          <h2 className="text-purple-500 text-2xl font-medium">Registration</h2>
          <div className="flex flex-col gap-3">
            <input
              className={cl.inputs}
              type="text"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            ></input>
            <input
              className={cl.inputs}
              type="email"
              placeholder="E-mail"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
              className={cl.inputs}
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <div>
            <button type="submit" className={cl.submit}>
              Sign Up
            </button>
          </div>
          <div>
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
