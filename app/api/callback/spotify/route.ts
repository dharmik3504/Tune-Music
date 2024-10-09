export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();

  return NextResponse.json({
    message: "hhh",
  });
}
