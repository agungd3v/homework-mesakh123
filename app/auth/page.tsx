import { login } from "../utils/session";
import { redirect } from "next/navigation";

export default async function Auth() {
  const submitLogin = async (param: FormData) => {
    "use server";

    const loginUser = await login(param);
    if (loginUser.status) {
      return redirect("/dashboard");
    }
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
