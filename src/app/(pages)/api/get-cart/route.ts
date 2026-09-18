import { getUserToken } from "@/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getUserToken();
    if (!token) {
      return NextResponse.json(
        { status: "fail", message: "Unauthorized", numOfCartItems: 0 },
        { status: 401 }
      );
    }

    const apiUrl = process.env.URL_API || "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${apiUrl}/cart`, {
      method: "GET",
      headers: {
        token: token,
      },
    });

    const data: CartResponse = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
