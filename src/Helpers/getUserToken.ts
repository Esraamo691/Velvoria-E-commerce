import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const cookieStore = await cookies();
  const tokenCookie =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!tokenCookie) return undefined;

  const accessToken = await decode({
    token: tokenCookie,
    secret:
      process.env.NEXTAUTH_SECRET ||
      "67Y4bDlmHVUHiIhzYE5IbYINm5+xQLSuWLy86lpxN/o=",
  });
  return accessToken?.token as string | undefined;
}
