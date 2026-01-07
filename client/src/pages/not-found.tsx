import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 glass border-white/10">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-serif text-white">Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <div className="mt-8">
            <Link href="/" className="inline-block w-full text-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all">
              Return Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
