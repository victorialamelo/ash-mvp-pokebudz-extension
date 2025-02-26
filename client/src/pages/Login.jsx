/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState(""); // Add state for password
  const navigate = useNavigate();

  /**
   * Handles user registration
   */
  async function handleRegister() {
    try {
      console.log("Registering with email:", email, "password:", password);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log(data.message); // Log success message

      alert("Registration successful! You can now log in.");
    } catch (e) {
      console.log(e);
      alert("Error: " + e.message); // Show error message
    }
  }
  /**
   * Handles the login form submission
   */
  async function handleLogin(formData) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const body = await response.text();
      const data = JSON.parse(body);

      console.log("login successful:", data);

      // Save the token in the local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // store the userId
      navigate(`/userpokemon/${data.userId}`); // redirect to /user/{userId}
    } catch (e) {
      console.log(e);
    }
  }

  const logout = () => {
    // Remove the token from localstorage
    localStorage.removeItem("token");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleLogin(formData);
        }}
      >
        <input
          type="text"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          required
        />
        <div className="d-flex gap-2 justify-content-center">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </div>
      </form>

      <div className="d-flex gap-2 justify-content-center mt-3">
        <button className="btn btn-outline-success" onClick={handleRegister}>
          Register
        </button>
      </div>

      <button className="btn btn-outline-dark ml-2" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default Login;
