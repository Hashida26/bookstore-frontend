import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../config/api";

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-[350px] bg-white rounded-xl shadow-2xl px-8 py-11 scale-[1.04]">

        <h2 className="text-lg font-semibold text-center mb-8
                       bg-linear-to-r from-blue-600 to-blue-400
                       bg-clip-text text-transparent">
          Create Account
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await API.post("/api/auth/register", {
                name: values.name,
                email: values.email,
                password: values.password,
              });

              alert("Registered successfully");
              resetForm();
              navigate("/Login");

            } catch (error) {
              alert(
                error.response?.data?.message || "Registration failed"
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* NAME */}
              <div className="mb-4">
                <label className="block text-xs mb-1 text-gray-600">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
                             focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="name" component="p"
                  className="text-[11px] text-red-500 mt-1" />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-xs mb-1 text-gray-600">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
                             focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="email" component="p"
                  className="text-[11px] text-red-500 mt-1" />
              </div>

              {/* PASSWORD */}
              <div className="mb-4">
                <label className="block text-xs mb-1 text-gray-600">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
                             focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="password" component="p"
                  className="text-[11px] text-red-500 mt-1" />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-7">
                <label className="block text-xs mb-1 text-gray-600">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
                             focus:border-blue-500 outline-none"
                />
                <ErrorMessage name="confirmPassword" component="p"
                  className="text-[11px] text-red-500 mt-1" />
              </div>

              {/* SUBMIT */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-2 text-xs font-medium bg-blue-600/90 text-white
                             rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg
                             transition disabled:opacity-60"
                >
                  {isSubmitting ? "Registering..." : "Sign Up"}
                </button>
              </div>

            </Form>
          )}
        </Formik>

        <p className="mt-7 text-xs text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
