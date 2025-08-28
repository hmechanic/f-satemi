import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { FormField } from '../../Components/FormField'
import { request } from '../../api/AxiosHandler';
import { Modal } from '../../Components/Modal';
import { RegisterSuccessful } from './RegisterSuccessful';
import { RegisterFailed } from './RegisterFailed';

function SignUp() {

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [error, setError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues } = useForm({ mode: "onChange" });

  function onSubmit(data) {
    request("POST", "/auth/register", {
      email: data.email,
      password: data.password,
      fullName: data.username,
      type: "user"
    })
      .then((response) => {
        setOpenLoginModal(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-7 lg:px-8 bg-gray-100">
      <div className="w-full max-w-md border border-gray-300 p-6 rounded-lg shadow-md bg-slate-50">
        <img
          alt="Your Company"
          src="../public/iconGreen.png"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>

        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              id="username"
              label="Full name"
              type="text"
              placeholder="Enter your full name"
              validation={{
                required: "Name is required",
                minLength: {
                  value: 6,
                  message: "Name must be at least 6 characters"
                },
                maxLength: {
                  value: 45,
                  message: "Name must not exceed 45 characters"
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Name must contain only letters"
                }
              }}
              register={register}
              getValues={getValues}
              errors={errors}
            />

            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address"
                }
              }}
              register={register}
              getValues={getValues}
              errors={errors}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              validation={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/,
                  message: "Password must include uppercase, lowercase, number, and special character"
                }
              }}
              register={register}
              getValues={getValues}
              errors={errors}
            />
            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              validation={{
                required: "Confirm Password is required",
                validate: value =>
                  value === getValues('password') || "Passwords do not match"
              }}
              register={register}
              getValues={getValues}
              errors={errors}
            />

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className='mt-4 text-sm font-light'>
            Already have an account? <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">Sign In</a>
          </p>
        </div>
      </div>
      <div id='modal'></div>
      {openLoginModal && (
        <Modal>
          <RegisterSuccessful />
        </Modal>
      )}
      {error && (
        <Modal>
          <RegisterFailed message={error} />
        </Modal>
      )}
    </div>
  )
}

export { SignUp }
