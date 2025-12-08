import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "@/ui/FormRowVertical.jsx";
import FormRow from "@/ui/FormRow.jsx";
import useLogin from "./useLogin.js";
import SpinnerMini from "@/ui/SpinnerMini.jsx";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("lj@example.com");
  const [password, setPassword] = useState("12345678");

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onError: (err) => {
          toast.error(err.message || "Login failed");
        },
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form type="modal" onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          required
          type="email"
          id="email"
          disabled={isLoading}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          required
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
