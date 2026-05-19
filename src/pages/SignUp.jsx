import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../api.js";
import { useHistory, useLocation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function SignUp() {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors, isLoading, isValid, isDirty },
  } = useForm({
    mode: "onBlur",
  });

  const [role, setRole] = useState();
  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedRoleId = Number(watch("role_id"));
  const location = useLocation();
  const turkishPhoneRegex = /^5[0-9]{9}$/;
  const taxNoRegex = /^T\d{4}V\d{6}$/i;
  const turkishIbanRegex = /^TR\d{24}$/i;

  const history = useHistory();
  console.log(history.location);
  useEffect(() => {
    api
      .get("/roles")
      .then((res) => {
        setRole(res.data);
        const foundRole = res.data.find((item) => item.code === "customer");
        setValue("role_id", foundRole.id);
      })
      .catch((err) => console.log("Hata var:", err));
  }, [setValue]);
  console.log(selectedRoleId);

  const submitFn = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...submitData } = data;
    api
      .post("/signup", submitData)
      .then((res) => {
        const destination = location.state?.from || "/login";
        toast.success(
          "You need to click link in email to activate your account!",
          {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          },
        );

        history.push({
          pathname: destination,
          state: { from: history.location.pathname },
        });

        console.log("Signed Up Succesfully", res.data);
      })
      .catch((err) => {
        console.error("Error occurred", err.message);
        let errorMessage = "Kayıt Sırasında Hata Oluştu";

        if (err.response?.data?.err?.code === "SQLITE_CONSTRAINT") {
          errorMessage = "Bu e-posta adresi zaten kayıtlı!";
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        }

        toast.error(errorMessage, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(submitFn)}
        className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="role_id"
              className="text-sm font-semibold text-gray-700"
            >
              Role
            </label>
            <div className="relative">
              <select
                id="role_id"
                {...register("role_id")}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                {role?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                ▼
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="text-xs font-medium text-red-500 mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/,
                  message:
                    "Must contain an uppercase letter, a lowercase letter, and a number",
                },
              })}
              className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
            />
            {errors.password && (
              <span className="text-xs font-medium text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords don't match!",
              })}
              className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
            />
            {errors.confirmPassword && (
              <span className="text-xs font-medium text-red-500 mt-1 shadow-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        {selectedRoleId === 2 && (
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Store Information
            </h3>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="store_name"
                className="text-sm font-semibold text-gray-700"
              >
                Store Name
              </label>
              <input
                id="store_name"
                {...register("store.name", {
                  required: "Store name is required",
                  minLength: {
                    value: 3,
                    message: "Store name must be at least 3 characters",
                  },
                })}
                placeholder="Your Store Name"
                className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.store?.name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
              />
              {errors.store?.name && (
                <span className="text-xs font-medium text-red-500 mt-1">
                  {errors.store?.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="store_phone"
                className="text-sm font-semibold text-gray-700"
              >
                Store Phone
              </label>
              <input
                type="number"
                id="store_phone"
                {...register("store.phone", {
                  required: "Store phone number is required",
                  pattern: {
                    value: turkishPhoneRegex,
                    message:
                      "Invalid Turkish phone number. Must be 10 digits (e.g. 5xxxxxxxxx)",
                  },
                })}
                placeholder="5XXXXXXXXX"
                className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.store?.phone ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
              />
              {errors.store?.phone && (
                <span className="text-xs font-medium text-red-500 mt-1">
                  {errors.store?.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="store_tax"
                className="text-sm font-semibold text-gray-700"
              >
                Store Tax Number
              </label>
              <input
                id="store_tax"
                {...register("store.tax_no", {
                  required: "Store tax number is required",
                  pattern: {
                    value: taxNoRegex,
                    message:
                      "Invalid Turkish tax number. (Format: TXXXXVXXXXXX)",
                  },
                })}
                placeholder="TXXXXVXXXXXX"
                className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.store?.tax_no ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
              />
              {errors.store?.tax_no && (
                <span className="text-xs font-medium text-red-500 mt-1">
                  {errors.store?.tax_no.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="bank_account"
                className="text-sm font-semibold text-gray-700"
              >
                Store Bank Account (IBAN)
              </label>
              <input
                id="bank_account"
                {...register("store.bank_account", {
                  required: "Store Iban number is required",
                  pattern: {
                    value: turkishIbanRegex,
                    message:
                      "Invalid Turkish Iban number. Must start with TR and contain 24 digits.",
                  },
                })}
                placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
                className={`w-full h-10 px-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.store?.bank_account ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
              />
              {errors.store?.bank_account && (
                <span className="text-xs font-medium text-red-500 mt-1">
                  {errors.store?.bank_account.message}
                </span>
              )}
            </div>
          </div>
        )}

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
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
