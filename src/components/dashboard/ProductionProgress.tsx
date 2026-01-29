import { cn } from "@/lib/utils";

interface Task {
  id: string;
  name: string;
  progress: number;
  status: "进行中" | "已完成" | "待处理" | "异常";
  dueTime: string;
}

const tasks: Task[] = [
  { id: "WO-2024-001", name: "零件A批次加工", progress: 85, status: "进行中", dueTime: "14:30" },
  { id: "WO-2024-002", name: "装配件B组装", progress: 100, status: "已完成", dueTime: "11:00" },
  { id: "WO-2024-003", name: "外壳C喷涂", progress: 45, status: "进行中", dueTime: "16:00" },
  { id: "WO-2024-004", name: "精密件D检测", progress: 0, status: "待处理", dueTime: "18:00" },
  { id: "WO-2024-005", name: "齿轮E热处理", progress: 30, status: "异常", dueTime: "15:30" },
];

const statusColors = {
  "进行中": "bg-primary text-primary-foreground",
  "已完成": "bg-success text-success-foreground",
  "待处理": "bg-muted text-muted-foreground",
  "异常": "bg-destructive text-destructive-foreground",
};

const progressColors = {
  "进行中": "bg-primary",
  "已完成": "bg-success",
  "待处理": "bg-muted-foreground",
  "异常": "bg-destructive",
};

export function ProductionProgress() {
  return (
    <div className="data-card tech-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">生产任务进度</h3>
        <span className="text-xs text-muted-foreground">共 {tasks.length} 项任务</span>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-data text-xs text-muted-foreground">{task.id}</span>
                <span className="text-sm text-foreground">{task.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">截止 {task.dueTime}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-medium",
                    statusColors[task.status]
                  )}
                >
                  {task.status}
                </span>
              </div>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                  progressColors[task.status]
                )}
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <div className="flex justify-end mt-1">
              <span className="font-data text-xs text-muted-foreground">{task.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
