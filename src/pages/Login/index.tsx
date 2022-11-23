import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import { Alert } from '../../components/Alert';

interface Props {
  onLoggedInChange: () => void;
}

export const Login: React.FC<Props> = ({ onLoggedInChange }): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e?.preventDefault();

    try {
      await loginUser({ email, password });
      onLoggedInChange();
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setHasError(true);
          setErrorMessage('The user is not registered.');
        }

        if (err.response?.status === 403) {
          setHasError(true);
          setErrorMessage('The user is blocked.');
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-[450px] min-h-[450px] m-24 bg-white border-solid border-2 rounded">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col px-10 gap-3">
          {hasError && (
            <Alert message={errorMessage} onChange={() => setHasError(false)} />
          )}
          <h2 className="text-purple-500 text-2xl font-medium">
            Authorization
          </h2>
          <div className="flex flex-col gap-3">
            <input
              className="border-2 rounded p-2 text-gray-30 hover:border-purple-500 transition outline-none focus:border-purple-500"
              type="email"
              placeholder="E-mail"
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <input
              className="border-2 rounded p-2 text-gray-30 hover:border-purple-500 transition outline-none focus:border-purple-500"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className="py-2 px-4 w-full font-semibold border-2 border-transparent rounded text-lg text-white bg-purple-500 hover:border-purple-500 hover:bg-white hover:text-purple-500 transition outline-none cursor-pointer"
            >
              Log In
            </button>
          </div>
          <div>
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
