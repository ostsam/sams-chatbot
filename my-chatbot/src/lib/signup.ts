import { authClient } from "./auth-client";
import { useState } from "react";

const [email, setEmail] = useState("")
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [image, setImage] = useState("");

const { data, error } = await authClient.signUp.email(
  {
    email, // user email address
    password, // user password -> min 8 characters by default
    name, // user display name
    image, // User image URL (optional)
    callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
  },
  {
    onRequest: (ctx) => {
      //show loading
    },
    onSuccess: (ctx) => {
      //redirect to the dashboard or sign in page
    },
    onError: (ctx) => {
      // display the error message
      alert(ctx.error.message);
    },
  },
);
