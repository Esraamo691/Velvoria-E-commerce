import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const token = await getUserToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const apiUrl =
      process.env.URL_API || "https://ecommerce.routemisr.com/api/v1";
    const response = await fetch(`${apiUrl}/cart/${productId}`, {
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
