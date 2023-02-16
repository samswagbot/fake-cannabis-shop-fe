import {
  FormControl,
  Button,
  TextField,
  FormLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../SignUp/signup.module.css";

const Login = () => {
  const { state } = useLocation();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState(true);
  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleOnSubmit = async () => {
    try {
      const { data: res } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth`,
        login
      );
      localStorage.setItem("token", res.data);
      navigate("/");
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

  const handleOnClose = () => {
    setNotification(false);
  };

  return (
    <div className={styles.layout}>
      {state && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          open={notification}
          onClose={handleOnClose}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            {state.firstName} {state.lastName} was successfully created! Please
            login with new user!
          </Alert>
        </Snackbar>
      )}
      <div className={styles.container}>
        <div className={styles.welcomeBack}>
          <h1>New User?</h1>
          <Button
            size="large"
            onClick={() => navigate("/signup")}
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
