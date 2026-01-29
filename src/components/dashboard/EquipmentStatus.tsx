import { cn } from "@/lib/utils";

interface Equipment {
  id: string;
  name: string;
  status: "运行中" | "待机" | "故障" | "维护中";
  oee: number;
  currentTask?: string;
}

const equipment: Equipment[] = [
  { id: "CNC-01", name: "数控车床1号", status: "运行中", oee: 92, currentTask: "WO-2024-001" },
  { id: "CNC-02", name: "数控车床2号", status: "运行中", oee: 87, currentTask: "WO-2024-003" },
  { id: "CNC-03", name: "加工中心3号", status: "待机", oee: 0 },
  { id: "CNC-04", name: "磨床4号", status: "故障", oee: 0 },
  { id: "CNC-05", name: "铣床5号", status: "运行中", oee: 78, currentTask: "WO-2024-005" },
  { id: "CNC-06", name: "钻床6号", status: "维护中", oee: 0 },
];

const statusConfig = {
  "运行中": { color: "bg-success", indicator: "status-online", label: "运行" },
  "待机": { color: "bg-primary", indicator: "status-warning", label: "待机" },
  "故障": { color: "bg-destructive", indicator: "status-offline", label: "故障" },
  "维护中": { color: "bg-warning", indicator: "status-warning", label: "维护" },
};

export function EquipmentStatus() {
  const runningCount = equipment.filter((e) => e.status === "运行中").length;
  const totalCount = equipment.length;
  const greenRate = Math.round((runningCount / totalCount) * 100);

  return (
    <div className="data-card tech-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">设备状态监控</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">绿灯率</span>
          <span className="font-data text-sm text-success">{greenRate}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {equipment.map((eq) => {
          const config = statusConfig[eq.status];
          return (
            <div
              key={eq.id}
              className={cn(
                "p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-data text-xs text-primary">{eq.id}</span>
                <div className={cn("status-indicator", config.indicator)} />
              </div>
              <p className="text-sm text-foreground mb-1 truncate">{eq.name}</p>
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded",
                    config.color,
                    "text-white"
                  )}
                >
                  {config.label}
                </span>
                {eq.oee > 0 && (
                  <span className="font-data text-xs text-muted-foreground">
                    OEE {eq.oee}%
                  </span>
                )}
              </div>
              {eq.currentTask && (
                <p className="text-[10px] text-muted-foreground mt-1 truncate">
                  任务: {eq.currentTask}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
