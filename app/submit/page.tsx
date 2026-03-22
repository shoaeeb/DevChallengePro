import { redirect } from "next/navigation";

// No challenge selected — send to challenges list to pick one
export default function SubmitRedirect() {
  redirect("/challenges");
}
