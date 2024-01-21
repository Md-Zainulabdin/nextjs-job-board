"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();

  // Spinner
  const Icons = {
    spinner: Loader2,
  };

  return (
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1">
        {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
