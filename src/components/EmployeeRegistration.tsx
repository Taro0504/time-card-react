import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';

type FormData = {
  employee_position_id: BigInteger;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  gender: string;
  birth_date: Date;
  employment_day: string;
  phone_number: string;
};

function EmployeeRegistration() {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { data: employeeData, error } = await supabase
        .from('employees')
        .insert([
          {
            employee_position_id: data.employee_position_id,
            first_name: data.first_name,
            last_name: data.last_name,
            first_name_kana: data.first_name_kana,
            last_name_kana: data.last_name_kana,
            gender: data.gender,
            birth_date: data.birth_date,
            employment_day: data.employment_day,
            phone_number: data.phone_number,
          },
        ]);
        console.log(employeeData);
      if (error) {
        console.error('登録エラー:', error);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-8">
      <h1 className="text-2xl mb-8 text-black">社員情報の登録</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        {/* 職位 */}
        <div className="mb-4 relative flex flex-col">
          <label htmlFor="position" className="block text-gray-700 mb-2">
            職位
          </label>
          <select
            {...register('employee_position_id', { required: true })}
            className="w-full p-2 border-b border-main-2 bg-transparent text-gray-700"
          >
            <option value="1">正社員</option>
            <option value="2">アルバイト</option>
            <option value="3">業務委託</option>
            <option value="4">事務員</option>
          </select>
          {errors.employee_position_id && (
            <span className="text-red text-sm mt-1">
              職位を選択してください
            </span>
          )}
        </div>
        {/* 名 */}
        <div className="mb-4 relative flex flex-col">
          <label htmlFor="first_name" className="block text-gray-700 mb-2">
            名
          </label>
          <input
            id="first_name"
            type="text"
            {...register('first_name', { required: true })}
            className="w-full p-2 border-b border-main-2 bg-transparent text-gray-700"
            placeholder="名"
          />
          {errors.first_name && (
            <span className="text-red text-sm mt-1">名を入力してください</span>
          )}
        </div>
        {/* 姓 */}
        <div className="mb-4 relative flex flex-col">
          <label htmlFor="last_name" className="block text-gray-700 mb-2">
            姓
          </label>
          <input
            id="last_name"
            type="text"
            {...register('last_name', { required: true })}
            className="w-full p-2 border-b border-main-2 bg-transparent text-gray-700"
            placeholder="姓"
          />
          {errors.last_name && (
            <span className="text-red text-sm mt-1">姓を入力してください</span>
          )}
        </div>
        {/* カナ名、カナ姓、性別（セレクトボタン）、生年月日、入社日、電話番号を以下に追加する */}
        <div className="px-4 py-2">
          <button
            type="submit"
            className="w-full bg-main text-gray p-2 rounded-md hover:bg-green-600"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeRegistration;
