import React, { useState } from "react";
import FormInput from "../../../components/FormInput/FormInput";
import axios from "axios";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import ToastNotification from "../../../components/Popup/ToastNotification/ToastNotification";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    email: "",
  });

  const inputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      placeholder: "Enter your first name",
      errorMessage: "First name should contain only letters!",
      label: "First Name",
      pattern: "^[a-zA-ZÀ-ÿ\\s'.,-]+$",
      // pattern: "^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$",
      required: true,
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "Enter your last name",
      errorMessage: "Last name should contain only letters!",
      label: "Last name",
      pattern: "^[a-zA-ZÀ-ÿ\\s'.,-]+$",
      // pattern: "^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$",
      required: true,
    },

    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      errorMessage: "It should be a valid email address!",
      // pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,22}",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,22}$",
      label: "Email",
      required: true,
    },

    {
      id: 4,
      name: "phone_number",
      type: "phone",
      placeholder: "Enter your phone number",
      label: "Phone Number",
      pattern: "^0[35789][0-9]{8}$",
      errorMessage:
        "Phone number must be 10 digits long and start with '0' followed by 3, 5, 7, 8, or 9",
      required: true,
    },

    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Enter your Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,20}$",
      required: true,
    },

    // {
    //   id: 6,
    //   name: "password",
    //   type: "password",
    //   placeholder: "Confirm Password",
    //   errorMessage: "Passwords don't match!",
    //   label: "Confirm Password",
    //   pattern: formData.password,
    //   required: true,
    // },
  ];

  const [errors, setErrors] = useState("");

  const validateField = (name, value) => {
    const input = inputs.find((i) => i.name === name);
    if (!input) return "";

    // Check required field first
    if (input.required && !value.trim()) {
      return `${input.label} is required.`;
    }

    // Check pattern next
    if (value && input.pattern && !new RegExp(input.pattern).test(value)) {
      return input.errorMessage;
    }

    // If no conditions fail, return an empty string
    return "";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const newError = validateField(name, value); // Recalculate error for this field
    setErrors((prev) => ({ ...prev, [name]: newError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      signup();
      // setErrors("");
      ToastNotification("Sign Up successfully", "success");
    } else {
      console.log("Errors in form", newErrors);
      ToastNotification("Check again!!!", "error");
    }
  };

  // Call API
  const signup = async () => {
    console.log("Sign up", formData);
    try {
      const response = await axios.post(
        "https://api.yourrlove.com/v1/signup",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
        localStorage.setItem("auth-token", response.data.metadata);
        window.location.replace("/");
      } else {
        alert(response.data.errors);
      }
    } catch (error) {
      console.error("An error occurred during sign up:", error);
      alert(
        "An error occurred during sign up. Please check the console for more details."
      );
    }
  };

  return (
    <section className="register">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <span
            style={{
              fontFamily: "Suranna",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            YOLOM{" "}
          </span>
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register
            </h1>
            {Object.values(errors).some((error) => error) && (
              <p style={{ color: "red" }}>Please correct the errors below.</p>
            )}
            <div className="space-y-4 md:space-y-6">
              {/* Form Sign up */}
              <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={formData[input.name]}
                    onChange={onChange}
                    errorMessage={errors[input.name]}
                  />
                ))}
                {/* Condition */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        I accept the
                        <Link
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          to="/customer-support#terms"
                          onClick={() => window.scrollTo(0, 150)}
                        >
                          {" "}
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                {/* ------------ */}
                <button type="submit">Submit</button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {" "}
                    Sign in here
                  </a>
                </p>
              </form>
              {/* ------------------ */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
