import { Skeleton } from "@/components/ui/skeleton"

export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="pt-16 pb-12 text-center px-4">
        <Skeleton className="h-12 w-3/4 max-w-lg mx-auto mb-4" />
        <Skeleton className="h-6 w-2/4 max-w-md mx-auto" />
      </div>

      <div className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <Skeleton className="h-10 w-48 mx-auto mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-4 w-36 mb-4" />
                  <Skeleton className="h-10 w-28 mb-6" />

                  <div className="space-y-3 mb-8">
                    {Array(6)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex items-center">
                          <Skeleton className="h-5 w-5 mr-3" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                  </div>

                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
