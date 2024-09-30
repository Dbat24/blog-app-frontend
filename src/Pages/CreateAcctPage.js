import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAcctPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const CreateAccount = async () => {
    try {
      if (password !== confirmpassword) {
        setError("Password and confirm password do not match.");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="create-acct-sect">
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Re-enter Your password"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={CreateAccount}>Create Account</button>
      <Link to="/login">Already have an account? Log in here</Link>
    </div>
  );
};

export default CreateAcctPage;
