/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState(""); // Add state for password
  const navigate = useNavigate();

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

      navigate(`/userpokemon`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Content">
      <form action={handleLogin}>
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

      <button
        className="btn btn-outline-dark ml-2"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}

export default LoginPage;
