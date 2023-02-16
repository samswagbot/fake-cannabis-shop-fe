import {
  FormControl,
  Button,
  TextField,
  FormLabel,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  const handleOnSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users`, signUp);
      if (res.status === 201) {
        navigate("/login", {
          state: { firstName: signUp.firstName, lastName: signUp.lastName },
        });
      } else {
        setError("Could not create user");
      }
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
          <h1>Welcome Back</h1>

          <Button
            size="large"
            variant="outlined"
            onClick={() => navigate("/login")}
            color="inherit"
          >
            Login
          </Button>
        </div>
        <div className={styles.formCtn}>
          <FormControl fullWidth>
            <FormLabel>Create an account</FormLabel>
            <TextField
              name="firstName"
              id="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleOnChange}
            />
            <TextField
              name="lastName"
              id="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleOnChange}
            />
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
            {error && (
              <Alert severity="error">
                <div>{error}</div>
              </Alert>
            )}
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
              Sign up
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
