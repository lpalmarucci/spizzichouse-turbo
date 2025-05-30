import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
}
