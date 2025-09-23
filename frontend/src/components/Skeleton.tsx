export function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`skel ${className}`} />;
  }
  
  export function TableSkeleton({ rows = 6 }: { rows?: number }) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-2">
              {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-3">
                  <Skeleton className="h-5" />
                  <Skeleton className="h-5" />
                  <Skeleton className="h-5" />
                  <Skeleton className="h-5" />
                  <Skeleton className="h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  