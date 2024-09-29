import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: "",
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("registrationNumber", data.registrationNumber);
      formData.append("phone", data.phone);
      formData.append("transactionNumber", data.transactionNumber);
      formData.append("paymentSS", data.paymentSS[0]);

      if (data.referralId) {
        formData.append("referralId", data.referralId);
      }
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSubmissionStatus({ success: true, error: "" });
        reset();
      } else {
        setSubmissionStatus({
          success: false,
          error: "Something went wrong. Contact admin.",
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 11000
      ) {
        const duplicateField = Object.keys(error.response.data.keyValue)[0];
        switch (duplicateField) {
          case "phone":
            setSubmissionStatus({
              success: false,
              error: "Phone number is already registered.",
            });
            break;
          case "email":
            setSubmissionStatus({
              success: false,
              error: "Email is already registered.",
            });
            break;
          case "registrationNumber":
            setSubmissionStatus({
              success: false,
              error: "Registration number is already registered.",
            });
            break;
          case "transactionNumber":
            setSubmissionStatus({
              success: false,
              error: "Transaction number is already registered.",
            });
            break;
          default:
            setSubmissionStatus({
              success: false,
              error: "Duplicate entry found.",
            });
            break;
        }
      } else {
        setSubmissionStatus({
          success: false,
          error: "Server error. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="m-4 text-center">
          <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-4xl sm:text-5xl md:text-6xl text-transparent">
            Computer Society Of India
          </span>
        </div>
        <div className="mb-12 text-center">
          <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-2xl sm:text-3xl md:text-3xl text-transparent">
            VIT Bhopal Chapter
          </span>
        </div>
        <div className="rounded-md border-2 border-gray-800 p-6 w-full md:w-3/4 lg:w-2/3 mb-8">
          <span className="inline-flex bg-[linear-gradient(110deg,#a8a8a8,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-2xl sm:text-3xl font-semibold text-transparent">
            Register For The Event
          </span>

          {isSubmitSuccessful && submissionStatus.success && (
            <div className="mt-4 p-4 bg-green-500 text-white rounded">
              <p>Registration successful!</p>
            </div>
          )}

          {submissionStatus.error && (
            <div className="mt-4 p-4 bg-red-500 text-white rounded">
              <p>{submissionStatus.error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-6"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={`bg-gray-700 border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  id="email"
                  className={`bg-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="example@vitbhopal.ac.in"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="registrationNumber"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  {...register("registrationNumber", {
                    required: "Registration number is required",
                  })}
                  id="registrationNumber"
                  className={`bg-gray-700 border ${
                    errors.registrationNumber
                      ? "border-red-500"
                      : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="2XBCE10XXX"
                />
                {errors.registrationNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Invalid phone number" },
                    maxLength: { value: 10, message: "Invalid phone number" },
                  })}
                  id="phone"
                  className={`bg-gray-700 border ${
                    errors.phone ? "border-red-500" : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="1234567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="transactionNumber"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Transaction Number / UTR
                </label>
                <input
                  type="text"
                  {...register("transactionNumber", {
                    required: "Transaction number is required",
                  })}
                  id="transactionNumber"
                  className={`bg-gray-700 border ${
                    errors.transactionNumber
                      ? "border-red-500"
                      : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="TXN789012"
                />
                {errors.transactionNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.transactionNumber.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="referralId"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Referral Id
                </label>
                <input
                  type="text"
                  {...register("referralId")}
                  id="referralId"
                  className={`bg-gray-700 border ${
                    errors.referralId ? "border-red-500" : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="REF456789"
                />
                {errors.referralId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.referralId.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="paymentSS"
                  className="block mb-2 text-lg font-medium text-gray-400"
                >
                  Payment Screenshot
                </label>
                <input
                  type="file"
                  {...register("paymentSS", {
                    required: "Payment screenshot is required",
                  })}
                  id="paymentSS"
                  accept="image/*"
                  className={`bg-gray-700 border ${
                    errors.paymentSS ? "border-red-500" : "border-gray-600"
                  } text-gray-300 rounded-lg text-md block w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.paymentSS && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentSS.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full md:w-1/2 lg:w-1/3 text-gray-300 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 transition duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
