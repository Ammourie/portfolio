import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { prisma } from "@/lib/prisma";

interface ValidationError {
  field: string;
  error: string;
}

const validateEmail = (email: string): ValidationError | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { field: "email", error: "Email is required" };
  if (!emailRegex.test(email))
    return { field: "email", error: "Invalid email format" };
  return null;
};

const validatePassword = (password: string): ValidationError | null => {
  const passwordMinLength = 8;
  if (!password) return { field: "password", error: "Password is required" };
  if (password.length < passwordMinLength)
    return {
      field: "password",
      error: `Password must be at least ${passwordMinLength} characters long`,
    };
  return null;
};

const setAuthCookie = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("authToken", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
  // console.log(req.method);
  // console.log((req.method !== 'POST').toString());
  // if (req.method !== 'POST') {
  //   return res
  //     .status(405)
  //     .json({ errors: [{ field: "method", error: "Method Not Allowed" }] });
  // }

  const { password, email } = req.body;
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.push(emailError);
  if (passwordError) errors.push(passwordError);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(404)
      .json({ errors: [{ field: "email", error: "Email not found" }] });
  }

  if (password === user.password) {
    setAuthCookie(res);
    return res.status(200).json({ success: true });
  } else {
    return res
      .status(401)
      .json({ errors: [{ field: "password", error: "Incorrect password" }] });
  }
}
