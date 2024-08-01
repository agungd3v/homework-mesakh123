import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(param: any) {
  return await new SignJWT(param)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(param: string) {
  try {
    const {payload} = await jwtVerify(param, key, {
      algorithms: ["HS256"]
    });
  
    return payload;
  } catch (error) {
    return null;
  }
}

export async function generateSession(user: any) {
  if (user) {
    delete user.password;

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({user, expires});
    cookies().set("session", session, {expires, httpOnly: false});

    return {status: true, message: "Login oke!"};
  }

  return {status: false, message: "Login failed!"};
}

export async function logout() {
  cookies().set("session", "", {expires: new Date(0)});
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
