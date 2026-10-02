import { notFound } from "next/navigation";

/** Any unknown URL under /en or /ms renders the branded 404 page inside the site layout. */
export default function CatchAll() {
  notFound();
}
