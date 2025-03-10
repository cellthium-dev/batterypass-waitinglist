import GlitchTitle from "@/components/glitch-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellDot } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative grid min-h-svh place-items-center items-center justify-center bg-gradient-to-b from-[#121312] to-[#060706] text-white">
      <div className="grid gap-y-8 sm:gap-y-6">
        <GlitchTitle />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input className="dark:border-white" placeholder="Enter your email" />
          <Button className="flex w-fit items-center gap-x-2 place-self-center">
            <BellDot />
            <span>Get notified</span>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-12 text-sm sm:text-base">
        Cellthium Labs.
      </div>
    </main>
  );
}
