/* eslint-disable no-unused-vars */
import { useState } from "react";

function Login() {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState(""); // Add state for password

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

      console.log(data);

      // Save the token in the local storage
      localStorage.setItem("token", data.token);
    } catch (e) {
      console.log(e);
    }
  }

  const logout = () => {
    // Remove the token from localstorage
    localStorage.removeItem("token");
  };

  const requestData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch("/api/auth/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} // Set email on change
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} // Set password on change
          required
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary">Log in</button>
        </div>
      </form>

      {/* Register button to trigger registration */}
      <div className="d-flex gap-2 justify-content-center mt-3">
        <button className="btn btn-outline-success" onClick={handleRegister}>
          Register
        </button>
      </div>

      <form action={logout}>
        <button className="btn btn-outline-dark ml-2">Log out</button>
      </form>

      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>

      {profile && (
        <div className="text-center p-4">
          <div className="alert">{profile.message}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
