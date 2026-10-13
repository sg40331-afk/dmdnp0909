import { NextResponse } from "next/server";
import { z } from "zod";
import { AdminAccessError } from "./board-server";
export function fail(error: unknown, status = 400) {
  if (error instanceof AdminAccessError) status = 401;
  return NextResponse.json(
    {
      error:
        error instanceof z.ZodError
          ? "입력값을 확인해 주세요."
          : error instanceof Error
            ? error.message
            : "요청에 실패했습니다.",
    },
    { status },
  );
}
