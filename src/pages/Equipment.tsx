import { 
  Factory, 
  Settings,
  AlertTriangle,
  CheckCircle2,
  Pause,
  Wrench,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Equipment {
  id: string;
  code: string;
  name: string;
  type: string;
  status: "运行中" | "待机" | "故障" | "维护中";
  oee: number;
  availability: number;
  performance: number;
  quality: number;
  currentTask?: string;
  runTime: number;
  lastMaintenance: string;
}

const equipment: Equipment[] = [
  {
    id: "1",
    code: "CNC-01",
    name: "数控车床1号",
    type: "数控车床",
    status: "运行中",
    oee: 92,
    availability: 95,
    performance: 98,
    quality: 99,
    currentTask: "WO-2024-001",
    runTime: 1250,
    lastMaintenance: "2024-03-15",
  },
  {
    id: "2",
    code: "CNC-02",
    name: "数控车床2号",
    type: "数控车床",
    status: "运行中",
    oee: 87,
    availability: 90,
    performance: 96,
    quality: 98,
    currentTask: "WO-2024-003",
    runTime: 980,
    lastMaintenance: "2024-03-18",
  },
  {
    id: "3",
    code: "VMC-01",
    name: "加工中心1号",
    type: "立式加工中心",
    status: "待机",
    oee: 0,
    availability: 100,
    performance: 0,
    quality: 0,
    runTime: 0,
    lastMaintenance: "2024-03-10",
  },
  {
    id: "4",
    code: "GR-01",
    name: "磨床1号",
    type: "平面磨床",
    status: "故障",
    oee: 0,
    availability: 0,
    performance: 0,
    quality: 0,
    runTime: 0,
    lastMaintenance: "2024-03-12",
  },
  {
    id: "5",
    code: "CNC-05",
    name: "铣床5号",
    type: "数控铣床",
    status: "运行中",
    oee: 78,
    availability: 85,
    performance: 92,
    quality: 99,
    currentTask: "WO-2024-005",
    runTime: 650,
    lastMaintenance: "2024-03-19",
  },
  {
    id: "6",
    code: "HT-01",
    name: "热处理炉1号",
    type: "热处理设备",
    status: "维护中",
    oee: 0,
    availability: 0,
    performance: 0,
    quality: 0,
    runTime: 0,
    lastMaintenance: "2024-03-20",
  },
];

const oeeData = [
  { time: "08:00", OEE: 85 },
  { time: "09:00", OEE: 88 },
  { time: "10:00", OEE: 92 },
  { time: "11:00", OEE: 87 },
  { time: "12:00", OEE: 75 },
  { time: "13:00", OEE: 89 },
  { time: "14:00", OEE: 91 },
];

const statusConfig = {
  "运行中": { color: "bg-success", textColor: "text-success", icon: CheckCircle2, bgColor: "bg-success/10" },
  "待机": { color: "bg-primary", textColor: "text-primary", icon: Pause, bgColor: "bg-primary/10" },
  "故障": { color: "bg-destructive", textColor: "text-destructive", icon: AlertTriangle, bgColor: "bg-destructive/10" },
  "维护中": { color: "bg-warning", textColor: "text-warning", icon: Wrench, bgColor: "bg-warning/10" },
};

export default function EquipmentPage() {
  const runningCount = equipment.filter((e) => e.status === "运行中").length;
  const totalCount = equipment.length;
  const greenRate = Math.round((runningCount / totalCount) * 100);
  const avgOee = Math.round(
    equipment.filter((e) => e.oee > 0).reduce((sum, e) => sum + e.oee, 0) /
      equipment.filter((e) => e.oee > 0).length
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">设备监控</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控设备运行状态与OEE指标
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-success font-medium">绿灯率 {greenRate}%</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Factory className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{runningCount}/{totalCount}</p>
              <p className="text-xs text-muted-foreground">运行中设备</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{avgOee}%</p>
              <p className="text-xs text-muted-foreground">平均OEE</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {equipment.filter((e) => e.status === "故障").length}
              </p>
              <p className="text-xs text-muted-foreground">故障设备</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {equipment.filter((e) => e.status === "维护中").length}
              </p>
              <p className="text-xs text-muted-foreground">维护中设备</p>
            </div>
          </div>
        </div>
      </div>

      {/* OEE Chart */}
      <div className="data-card tech-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">综合OEE趋势</h3>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">实时更新</span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={oeeData}>
              <defs>
                <linearGradient id="colorOEE" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="time" stroke="hsl(215, 20%, 55%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={11} tickLine={false} domain={[60, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 8%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="OEE"
                stroke="hsl(199, 89%, 48%)"
                fillOpacity={1}
                fill="url(#colorOEE)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map((eq) => {
          const config = statusConfig[eq.status];
          const StatusIcon = config.icon;

          return (
            <div key={eq.id} className="data-card tech-border hover:border-primary/40 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.bgColor)}>
                    <Factory className={cn("w-4 h-4", config.textColor)} />
                  </div>
                  <div>
                    <span className="font-data text-sm text-primary">{eq.code}</span>
                    <p className="text-xs text-muted-foreground">{eq.type}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1",
                    config.bgColor,
                    config.textColor
                  )}
                >
                  <StatusIcon className="w-3 h-3" />
                  {eq.status}
                </span>
              </div>

              <p className="text-sm font-medium text-foreground mb-3">{eq.name}</p>

              {eq.oee > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <p className="font-data text-lg text-primary">{eq.oee}%</p>
                    <p className="text-[10px] text-muted-foreground">OEE</p>
                  </div>
                  <div className="text-center">
                    <p className="font-data text-sm text-foreground">{eq.availability}%</p>
                    <p className="text-[10px] text-muted-foreground">可用率</p>
                  </div>
                  <div className="text-center">
                    <p className="font-data text-sm text-foreground">{eq.performance}%</p>
                    <p className="text-[10px] text-muted-foreground">性能</p>
                  </div>
                  <div className="text-center">
                    <p className="font-data text-sm text-foreground">{eq.quality}%</p>
                    <p className="text-[10px] text-muted-foreground">质量</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>运行 {eq.runTime}h</span>
                </div>
                {eq.currentTask && (
                  <span className="text-primary">任务: {eq.currentTask}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
