"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./modal.provider";

export default function ComposeProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
