"use client";
import Cookie from "js-cookie";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  function signOut() {
    router.push("/auth/login");
    Cookie.remove("auth_token");
  }
  return (
    <div className="text-fuchsia-600">
      <button onClick={signOut}>Logout</button>:
    </div>
  );
}
export default LoginPage;
