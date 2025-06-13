"use server";
import { auth } from "~/lib/auth";
import { useState } from "react";

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "user@email.com",
      password: "password",
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "user@email.com",
      password: "password",
      name: "John Smith",
    },
  });
};
