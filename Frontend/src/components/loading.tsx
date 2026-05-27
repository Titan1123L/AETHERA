import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton() {
  return (
    <div className="w-full space-y-8 py-4">
      {/* Skeleton for Favorite Cities */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <div className="flex gap-4 pb-4 overflow-hidden">
          <Skeleton className="min-w-[260px] h-[200px] rounded-2xl glass-card" />
          <Skeleton className="min-w-[260px] h-[200px] rounded-2xl glass-card" />
          <Skeleton className="min-w-[260px] h-[200px] rounded-2xl glass-card" />
        </div>
      </div>

      {/* Main Weather Grid Skeletons */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Current Weather Skeleton */}
        <div className="lg:col-span-3">
          <Skeleton className="h-[400px] w-full rounded-2xl glass-card" />
        </div>

        {/* Hourly Chart Skeleton */}
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-2xl glass-card" />
        </div>
      </div>

      {/* Weather Details & Forecast Skeletons */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-2xl glass-card" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-2xl glass-card" />
        </div>
      </div>
    </div>
  );
}
export default WeatherSkeleton;
