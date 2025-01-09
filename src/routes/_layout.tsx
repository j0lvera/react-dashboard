import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout.tsx";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});
