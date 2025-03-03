import { useNavigate } from "react-router";
import { backendAuthLogin } from "../backend";
import { saveSession } from "../session";

function LoginPage() {
  const navigate = useNavigate();

  // form action handles the login form submission
  async function handleLogin(formData) {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { token } = await backendAuthLogin(credentials);

    saveSession(token);

    navigate(`/userpokemon`);
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
        <div style={{ padding: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </div>
      </form>

      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default LoginPage;
