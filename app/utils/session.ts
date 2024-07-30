import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

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
  const {payload} = await jwtVerify(param, key, {
    algorithms: ["HS256"]
  });

  return payload;
}

export async function login(formData: FormData) {
  if (["admin", "manager", "viewer"].includes(formData.get("username") as string)) {
    let user = {};
    if (formData.get("username") == "admin") user = {id: 1, name: "Admin", role: 1};
    if (formData.get("username") == "manager") user = {id: 2, name: "Manager", role: 2};
    if (formData.get("username") == "viewer") user = {id: 3, name: "Viewer", role: 3};
  
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });
  
    cookies().set("session", session, { expires, httpOnly: true });
    return {status: true, message: "Login oke!"};
  }

  return {status: false, message: "Login failed!"};
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
