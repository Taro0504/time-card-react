import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import supabase from '../utils/supabaseClient';

type FormData = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { data: userData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    if (userData) {
      navigate('/login');
    } else {
      // エラーメッセージ
      console.error('登録エラー:', error?.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex bg-[url('/public/images/register-bg.png')] bg-no-repeat bg-contain bg-center">
        <div className="ml-6 mt-6">
          <FontAwesomeIcon icon={faCoffee} />
          <span className="text-xl font-bold text-black">Functional Lab</span>
        </div>
      </div>
      <div className="w-1/2 bg-main-2 flex items-center justify-center">
        <div className="bg-white flex flex-col items-center justify-center text-center content-center rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 rounded-lg shadow-md w-96"
          >
            <div className="mb-4 relative flex flex-col text-center">
              <label className="block text-gray-300 mb-2">名前</label>
              <input
                {...register('name', { required: true })}
                className="w-full p-2 border-b border-blue-500 bg-transparent text-gray-700"
                placeholder="名前"
              />
              {errors.name && (
                <span className="text-red text-sm mt-1">
                  このフィールドは必須です
                </span>
              )}
            </div>
            <div className="mb-4 relative flex flex-col text-center">
              <label className="block text-gray-300 mb-2">メールアドレス</label>
              <input
                {...register('email', { required: true })}
                className="w-full p-2 border-b border-blue-500 bg-transparent text-gray-700"
                placeholder="メールアドレス"
              />
              {errors.email && (
                <span className="text-red text-sm mt-1">
                  このフィールドは必須です
                </span>
              )}
            </div>
            <div className="mb-4 relative flex flex-col text-center">
              <label className="block text-gray-700 mb-2">パスワード</label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="w-full p-2 border-b border-green-500 bg-transparent text-gray-700"
                placeholder="パスワード"
              />
              {errors.password && (
                <span className="text-red text-sm mt-1">
                  このフィールドは必須です
                </span>
              )}
            </div>
            <div className="px-4 py-2">
              <button
                type="submit"
                className="w-full bg-main text-gray p-2 rounded-md hover:bg-green-600"
              >
                新規登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
