import { useState } from "react";
import { 
  Send, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  Wrench,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  taskNo: string;
  orderNo: string;
  productName: string;
  processName: string;
  quantity: number;
  equipment: string;
  operator: string;
  status: "待派单" | "已派单" | "生产中" | "已完成";
  plannedStart: string;
  plannedEnd: string;
  priority: 1 | 2 | 3;
}

const tasks: Task[] = [
  {
    id: "1",
    taskNo: "WO-240320-001-OP10",
    orderNo: "ORD-240320-001",
    productName: "精密轴承A型",
    processName: "粗车外圆",
    quantity: 500,
    equipment: "CNC-01",
    operator: "张师傅",
    status: "生产中",
    plannedStart: "2024-03-20 08:00",
    plannedEnd: "2024-03-20 16:00",
    priority: 2,
  },
  {
    id: "2",
    taskNo: "WO-240320-001-OP20",
    orderNo: "ORD-240320-001",
    productName: "精密轴承A型",
    processName: "精车外圆",
    quantity: 500,
    equipment: "CNC-02",
    operator: "李师傅",
    status: "待派单",
    plannedStart: "2024-03-20 16:00",
    plannedEnd: "2024-03-21 08:00",
    priority: 2,
  },
  {
    id: "3",
    taskNo: "WO-240320-002-OP10",
    orderNo: "ORD-240320-002",
    productName: "航空接头B型",
    processName: "铣削加工",
    quantity: 50,
    equipment: "CNC-05",
    operator: "王师傅",
    status: "待派单",
    plannedStart: "2024-03-20 08:00",
    plannedEnd: "2024-03-20 12:00",
    priority: 1,
  },
  {
    id: "4",
    taskNo: "WO-240319-003-OP30",
    orderNo: "ORD-240319-003",
    productName: "密封圈C型",
    processName: "热处理",
    quantity: 2000,
    equipment: "HT-01",
    operator: "赵师傅",
    status: "已派单",
    plannedStart: "2024-03-20 10:00",
    plannedEnd: "2024-03-20 18:00",
    priority: 3,
  },
  {
    id: "5",
    taskNo: "WO-240319-004-OP10",
    orderNo: "ORD-240319-004",
    productName: "齿轮组件D型",
    processName: "滚齿加工",
    quantity: 100,
    equipment: "GR-01",
    operator: "刘师傅",
    status: "生产中",
    plannedStart: "2024-03-19 14:00",
    plannedEnd: "2024-03-20 14:00",
    priority: 2,
  },
];

const statusConfig = {
  "待派单": { color: "bg-warning/20 text-warning border-warning/30", icon: Clock },
  "已派单": { color: "bg-primary/20 text-primary border-primary/30", icon: Send },
  "生产中": { color: "bg-secondary/20 text-secondary border-secondary/30", icon: Wrench },
  "已完成": { color: "bg-success/20 text-success border-success/30", icon: CheckCircle },
};

const priorityConfig = {
  1: { label: "紧急", color: "border-l-destructive" },
  2: { label: "高", color: "border-l-warning" },
  3: { label: "普通", color: "border-l-primary" },
};

export default function Dispatch() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const pendingTasks = tasks.filter((t) => t.status === "待派单");
  const activeTasks = tasks.filter((t) => t.status === "生产中" || t.status === "已派单");

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">生产派单</h1>
          <p className="text-sm text-muted-foreground mt-1">
            任务调度与设备分配，支持智能派单
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            排产日历
          </Button>
          <Button 
            className="gap-2"
            disabled={selectedTasks.length === 0}
          >
            <Send className="w-4 h-4" />
            批量派单 ({selectedTasks.length})
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{pendingTasks.length}</p>
              <p className="text-xs text-muted-foreground">待派单任务</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{activeTasks.length}</p>
              <p className="text-xs text-muted-foreground">进行中任务</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">在岗人员</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">1</p>
              <p className="text-xs text-muted-foreground">紧急任务</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="data-card tech-border">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索任务号、订单号..."
              className="w-full h-9 pl-9 pr-4 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            筛选条件
          </Button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tasks.map((task) => {
          const config = statusConfig[task.status];
          const StatusIcon = config.icon;
          const isSelected = selectedTasks.includes(task.id);
          const priorityConf = priorityConfig[task.priority];

          return (
            <div
              key={task.id}
              className={cn(
                "data-card tech-border cursor-pointer transition-all duration-200 border-l-4",
                priorityConf.color,
                isSelected && "ring-2 ring-primary/50 bg-primary/5",
                task.status === "待派单" && "hover:border-primary/40"
              )}
              onClick={() => task.status === "待派单" && toggleTask(task.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-data text-sm text-primary">{task.taskNo}</span>
                  {task.priority === 1 && (
                    <span className="px-1.5 py-0.5 rounded bg-destructive/20 text-destructive text-[10px] font-medium">
                      紧急
                    </span>
                  )}
                </div>
                <span className={cn("px-2 py-0.5 rounded border text-[10px] font-medium flex items-center gap-1", config.color)}>
                  <StatusIcon className="w-3 h-3" />
                  {task.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{task.productName}</span>
                  <span className="text-xs text-muted-foreground">{task.processName}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>订单: {task.orderNo}</span>
                  <span>数量: <span className="font-data text-foreground">{task.quantity}</span></span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-foreground">{task.equipment}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-foreground">{task.operator}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{task.plannedStart.split(" ")[1]}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>{task.plannedEnd.split(" ")[1]}</span>
                  </div>
                </div>
              </div>

              {task.status === "待派单" && (
                <div className="mt-3 pt-3 border-t border-border/50 flex justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-1 text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Dispatch single task
                    }}
                  >
                    <Send className="w-3 h-3" />
                    立即派单
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
