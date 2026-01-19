import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../config/api";
import { useContext } from "react";
import { AuthContext } from "../../../context/Authcontext";

export default function Login() {
  const navigate = useNavigate();
  const {setUser}=useContext(AuthContext)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="w-full max-w-[350px] bg-white rounded-xl
                   shadow-2xl px-8 py-11 scale-[1.04]"
      >

        {/* GLOSSY HEADING */}
        <h2
          className="text-lg font-semibold text-center mb-8
                     bg-linear-to-r from-blue-600 to-blue-400
                     bg-clip-text text-transparent"
        >
          Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
onSubmit={async (values, { setSubmitting }) => {
  console.log("LOGIN VALUES:", values);

  try {
    const res = await API.post("/api/auth/login", values);
    console.log("LOGIN RESPONSE 👉", res.data);

    

    // Store auth data
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("role", res.data.role);
localStorage.setItem("user", res.data.name);
localStorage.setItem("email", res.data.email); // optional but useful
setUser(res.data.name);   
// username

    navigate("/");
  } catch (err) {
    alert("Invalid email or password");
  } finally {
    setSubmitting(false);
  }
}}

        >
          {() => (
            <Form>
              {/* EMAIL */}
              <div className="mb-5">
                <label className="block text-xs mb-1 text-gray-600">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full h-10 px-3 text-sm
                             border border-gray-300 rounded-md
                             focus:border-blue-500 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-[11px] text-red-500 mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-7">
                <label className="block text-xs mb-1 text-gray-600">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full h-10 px-3 text-sm
                             border border-gray-300 rounded-md
                             focus:border-blue-500 outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-[11px] text-red-500 mt-1"
                />
              </div>

              {/* LOGIN BUTTON */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-10 py-2 text-xs font-medium
                             bg-blue-600/90 text-white
                             rounded-md shadow-md
                             hover:bg-blue-700 hover:shadow-lg
                             transition"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* REGISTER */}
        <p className="mt-7 text-xs text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/Signup"
            className="text-blue-600 hover:underline"
          >
            Click here to register
          </Link>
        </p>
      </div>
    </div>
  );
}
