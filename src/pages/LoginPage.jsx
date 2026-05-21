import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../store/actions/clientActions";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors, isValid,isDirty },
  } = useForm({
    mode:"onBlur"
  });

  const history = useHistory();
  const location =useLocation();
  const dispatch = useDispatch();


  const submitFn =(data)=>{
    const {email,password}=data;
    const credentials = {email,password}
    const {rememberMe} = data
    dispatch(loginUser(credentials,rememberMe,location,history));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
      className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      onSubmit={handleSubmit(submitFn)}
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <span className="text-xs font-medium text-red-500 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
            })}
            className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
          />
          {errors.password && (
            <span className="text-xs font-medium text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
         <div className="flex flex-col gap-1.5 " >
            <label htmlFor="rememberMe" className="text-sm font-semibold text-gray-700 flex items-center gap-4">Remember Me
            <input
            id="rememberMe"
            type="checkbox"
            className="w-4 h-4"
            {...register('rememberMe')}
            />
            </label>
             {errors.rememberMe && (
            <span className="text-xs font-medium text-red-500 mt-1">
              {errors.rememberMe.message}
            </span>)}
           
         </div>
        <button
          disabled={!isValid || !isDirty || isLoading}
          className={`w-full h-10 px-3 border rounded-lg flex gap-3 justify-center items-center transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            !isValid
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 border-blue-600 text-white hover:bg-blue-600 cursor-pointer"
          }`}
        >
          {isLoading ? (
            <>
              <div
                className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-white animate-spin"
                style={{ animationDuration: "0.6s" }}
              >
                <span className="opacity-90"></span>
              </div>
              <span>Loading...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
