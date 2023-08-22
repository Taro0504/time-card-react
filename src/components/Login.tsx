import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabaseClient';

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (userData.user) {
        navigate('/dashboard'); // ログイン後のリダイレクト先
      } else {
        // エラーメッセージ
        console.error('ログインエラー:', error?.message);
      }
    } catch (error) {
      console.error('登録エラー:', error);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2 flex bg-[url('/public/images/login-bg.png')] bg-no-repeat bg-contain bg-center">
        <div className="ml-6 mt-6">
          <FontAwesomeIcon icon={faCoffee} />
          <span className="text-xl font-bold text-black">Functional Lab</span>
        </div>
      </div>
      <div className="w-1/2 bg-main-2 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-8 text-black">Welcome to Functional Lab!</h1>
        <div className="bg-white flex flex-col items-center justify-center text-center content-center rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 rounded-lg shadow-md w-96"
          >
            <div className="mb-4 relative flex flex-col text-center">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                className="w-full p-2 border-b border-main-2 bg-transparent text-gray-700"
                placeholder="メールアドレス"
              />
              {errors.email && (
                <span className="text-red text-sm mt-1">
                  メールアドレスを入力してください
                </span>
              )}
            </div>
            <div className="mb-4 relative flex flex-col">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                パスワード
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
                className="w-full p-2 border-b border-main-2 bg-transparent text-gray-700"
                placeholder="パスワード"
              />
              {errors.password && (
                <span className="text-red text-sm mt-1">
                  パスワードを入力してください
                </span>
              )}
            </div>
            <div className="px-4 py-2">
              <button
                type="submit"
                className="w-full bg-main text-gray p-2 rounded-md hover:bg-green-600"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4">
          <p className="h-100">
            アカウント登録がまだの方は
            <Link
              to="/register"
              className="text-main rounded hover:text-red text-center"
            >
              こちら
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
