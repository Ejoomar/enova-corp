import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  /** Pass null to hide the trend row entirely (e.g. no prior-period data). */
  change?: number | null
  icon: LucideIcon
}

export function StatsCard({ title, value, change = null, icon: Icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1 sm:p-6 sm:pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm truncate pr-1">
          {title}
        </CardTitle>
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
      </CardHeader>
      <CardContent className="p-3 pt-1 sm:p-6 sm:pt-0">
        <div className="text-xl font-bold sm:text-2xl">{value}</div>

        {change != null && (
          <div className="flex items-center gap-1 text-xs mt-1">
            {change === 0 ? (
              <span className="text-muted-foreground hidden sm:inline">Sin cambio</span>
            ) : change > 0 ? (
              <>
                <TrendingUp className="h-3 w-3 shrink-0 text-[var(--color-success)]" />
                <span className={cn("text-[var(--color-success)]")}>+{change}%</span>
                <span className="text-muted-foreground hidden sm:inline">vs mes anterior</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 shrink-0 text-destructive" />
                <span className="text-destructive">{change}%</span>
                <span className="text-muted-foreground hidden sm:inline">vs mes anterior</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
