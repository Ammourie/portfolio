"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/app/resources";
import { Flex, Spinner, Input, Button, Heading } from "@/once-ui/components";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<
    { field: string; error: string }[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }

        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (pathname?.startsWith(route) && routes[route]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      console.clear();
      
      const errorMessage = await response.json();
      console.log(errorMessage);
      if (errorMessage.errors && Array.isArray(errorMessage.errors)) {
        const emailError = errorMessage.errors.find((error: { field: string; }) => error.field === "email");
        const passwordError = errorMessage.errors.find((error: { field: string; }) => error.field === "password");
        
        setError([
          ...(emailError ? [{ field: "email", error: emailError.error }] : []),
          ...(passwordError ? [{ field: "password", error: passwordError.error }] : [])
        ]);
      } else {
        setError([
          {
            field: "email",
            error: "An error occurred. Please try again.",
          },
          {
            field: "password",
            error: "An error occurred. Please try again.",
          },
        ]);
      }
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return (
      <Flex fillWidth paddingY="128" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Flex
        fillWidth
        paddingY="128"
        maxWidth={24}
        gap="24"
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Input
          id="email"
          type="email"
          label="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
          }}
          error={error && error.find((e) => e.field === "email")?.error}
        />
        <Input
          id="password"
          type="password"
          label="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(undefined);
          }}
          error={error && error.find((e) => e.field === "password")?.error}
        />
        <Button onClick={handlePasswordSubmit} size="l">
          Submit
        </Button>
      </Flex>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
