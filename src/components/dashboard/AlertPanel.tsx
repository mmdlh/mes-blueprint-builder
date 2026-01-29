import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "error",
    title: "设备故障",
    message: "CNC-04磨床主轴温度异常，已自动停机",
    time: "2分钟前",
  },
  {
    id: "2",
    type: "warning",
    title: "产能预警",
    message: "WO-2024-005生产进度滞后，预计延期2小时",
    time: "15分钟前",
  },
  {
    id: "3",
    type: "warning",
    title: "刀具寿命",
    message: "铣刀T-2024剩余寿命低于30%，建议更换",
    time: "30分钟前",
  },
  {
    id: "4",
    type: "info",
    title: "检验完成",
    message: "WO-2024-002首检合格，已进入正式生产",
    time: "45分钟前",
  },
];

const alertConfig = {
  error: {
    icon: AlertCircle,
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    iconColor: "text-destructive",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    iconColor: "text-warning",
  },
  info: {
    icon: Info,
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
  },
};

export function AlertPanel() {
  return (
    <div className="data-card tech-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">实时预警</h3>
        <span className="px-2 py-0.5 rounded bg-destructive/20 text-destructive text-xs font-medium">
          {alerts.filter((a) => a.type === "error").length} 紧急
        </span>
      </div>

      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg border flex items-start gap-3 group",
                config.bgColor,
                config.borderColor
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {alert.message}
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
