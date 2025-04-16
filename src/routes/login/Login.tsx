import * as Yup from "yup";
import "./Login.css";
import { useFormik } from "formik";
import { useUser } from "../../hooks/useUser";
import { Role } from "../../types";
import { useNavigate } from "react-router-dom";

//sign in validation schema
/*const validateNewUser = Yup.object({
  email: Yup.string().required("email is required")
    .test('No whitespaces', 'Your email must not contain whitespaces', (value) => !/[\s\t\r\n\v\f]/g.test(value))  
  ,
  password: Yup.string().required("Password is required")
    .min(8, "Your password should be eight characters minimum")
    .max(64, "Your password can not be longer than sixty-four characters")
    .matches(/[^A-Z0-9\s]/gi, "Your password must contain at least one special character")
    .matches(/[0-9]/g, "Your password must contain at least one numberic digit")
    .test('No whitespaces', 'Your password must not contain whitespaces', (value) => !/[\s\t\r\n\v\f]/g.test(value))  
});*/

const validateLogIn = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogIn,
    onSubmit: values => {
      /** "Log in" mock-up user */
      /** ADMIN */
      if (values.email === "admin@example.com") {
        setUser({ email: values.email, role: Role.ADMIN });
      }

      /** CLIENT */
      if (values.email === "client@example.com") {
        setUser({ email: values.email, role: Role.CLIENT });
      }

      navigate("/");
    },
  });

  return (
    <div id="login">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <p>
            <label htmlFor="email">Email:</label>
            <input id="email" type="text" {...formik.getFieldProps("email")} />
          </p>
          {formik.errors.email && formik.touched.email ? (
            <p className="error-msg">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="row">
          <p>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
            />
          </p>
          {formik.errors.password && formik.touched.password ? (
            <p className="error-msg">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="row">
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};
