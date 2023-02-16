import { FormControl, Button, TextField, FormLabel } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../SignUp/signup.module.css";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleOnSubmit = async () => {
    try {
      const res = await axios.post("/api/users", login);
      console.log(res);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.welcomeBack}>
          <h1>New User?</h1>
          <Button
            size="large"
            onClick={() => <Navigate to="/signup" />}
            variant="outlined"
            color="inherit"
          >
            Sign up
          </Button>
        </div>
        <div className={styles.formCtn}>
          <FormControl fullWidth>
            <FormLabel>Login</FormLabel>
            <TextField
              name="email"
              type="email"
              id="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleOnChange}
            />
            <TextField
              type="password"
              name="password"
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleOnChange}
            />
            {error && <div>{error}</div>}
            <Button
              sx={{
                marginTop: 2,
              }}
              variant="contained"
              fullWidth
              color="secondary"
              size="large"
              type="submit"
              onClick={handleOnSubmit}
            >
              Login
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Login;
