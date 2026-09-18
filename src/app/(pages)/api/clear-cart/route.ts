import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const token = await getUserToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiUrl =
      process.env.URL_API || "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${apiUrl}/cart`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
