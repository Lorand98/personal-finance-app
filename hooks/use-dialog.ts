"use client";

import { useState } from "react";
import { useToast } from "./use-toast";

interface ToastConfig {
  title: string;
  description: string;
}

export function useDialog(successToast: ToastConfig) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSuccess = () => {
    toast(successToast);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleSuccess,
  };
}
