import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const token = await getUserToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, count } = body;

    const apiUrl =
      process.env.URL_API || "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${apiUrl}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ count }),
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
