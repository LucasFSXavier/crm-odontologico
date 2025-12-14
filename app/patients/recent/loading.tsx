import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center justify-between px-8">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </header>
        <main className="flex-1 p-8">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
      </div>
    </div>
  )
}
