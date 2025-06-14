"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If still loading, do nothing.
    if (status === "loading") return;

    // If no session exists, redirect to the login page.
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (!session) {
    // Optionally, show a loading spinner or message.
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
