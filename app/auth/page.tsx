import { login } from "../utils/session";

export default async function Auth() {
  const submitLogin = async (param: FormData) => {
    "use server";
    await login(param);
  }

  return (
    <div>
      <form action={submitLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          autoComplete="off"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
