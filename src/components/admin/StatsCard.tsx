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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        {change != null && (
          <div className="flex items-center gap-1 text-xs mt-1">
            {change === 0 ? (
              <span className="text-muted-foreground">Sin cambio vs mes anterior</span>
            ) : change > 0 ? (
              <>
                <TrendingUp className="h-3 w-3 text-[var(--color-success)]" />
                <span className={cn("text-[var(--color-success)]")}>
                  +{change}%
                </span>
                <span className="text-muted-foreground">vs mes anterior</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-destructive" />
                <span className="text-destructive">{change}%</span>
                <span className="text-muted-foreground">vs mes anterior</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
