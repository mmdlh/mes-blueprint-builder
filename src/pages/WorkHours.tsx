import { 
  Clock, 
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface WorkHourRecord {
  id: string;
  taskNo: string;
  productName: string;
  operator: string;
  quotaHours: number;
  actualHours: number;
  deviation: number;
  status: "正常" | "超时" | "节约";
  date: string;
}

const records: WorkHourRecord[] = [
  {
    id: "1",
    taskNo: "WO-240320-001",
    productName: "精密轴承A型",
    operator: "张师傅",
    quotaHours: 8,
    actualHours: 7.5,
    deviation: -6.25,
    status: "节约",
    date: "2024-03-20",
  },
  {
    id: "2",
    taskNo: "WO-240320-002",
    productName: "航空接头B型",
    operator: "李师傅",
    quotaHours: 4,
    actualHours: 5.2,
    deviation: 30,
    status: "超时",
    date: "2024-03-20",
  },
  {
    id: "3",
    taskNo: "WO-240319-003",
    productName: "密封圈C型",
    operator: "王师傅",
    quotaHours: 16,
    actualHours: 15.5,
    deviation: -3.1,
    status: "正常",
    date: "2024-03-19",
  },
  {
    id: "4",
    taskNo: "WO-240319-004",
    productName: "齿轮组件D型",
    operator: "赵师傅",
    quotaHours: 12,
    actualHours: 11.8,
    deviation: -1.7,
    status: "正常",
    date: "2024-03-19",
  },
];

const chartData = [
  { name: "张师傅", 定额工时: 40, 实际工时: 38, 有效工时: 36 },
  { name: "李师傅", 定额工时: 40, 实际工时: 45, 有效工时: 42 },
  { name: "王师傅", 定额工时: 40, 实际工时: 39, 有效工时: 38 },
  { name: "赵师傅", 定额工时: 40, 实际工时: 37, 有效工时: 35 },
  { name: "刘师傅", 定额工时: 40, 实际工时: 41, 有效工时: 40 },
];

const statusConfig = {
  "正常": "text-primary bg-primary/10",
  "超时": "text-destructive bg-destructive/10",
  "节约": "text-success bg-success/10",
};

export default function WorkHours() {
  const totalQuota = records.reduce((sum, r) => sum + r.quotaHours, 0);
  const totalActual = records.reduce((sum, r) => sum + r.actualHours, 0);
  const avgDeviation = ((totalActual - totalQuota) / totalQuota * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">工时管理</h1>
          <p className="text-sm text-muted-foreground mt-1">
            工时定额、实际工时统计与核销管理
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            选择日期
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            导出报表
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{totalQuota}h</p>
              <p className="text-xs text-muted-foreground">定额工时</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{totalActual}h</p>
              <p className="text-xs text-muted-foreground">实际工时</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className={cn(
                "text-2xl font-data font-semibold",
                Number(avgDeviation) > 0 ? "text-destructive" : "text-success"
              )}>
                {Number(avgDeviation) > 0 ? "+" : ""}{avgDeviation}%
              </p>
              <p className="text-xs text-muted-foreground">平均偏差</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">在岗人员</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="data-card tech-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">本周人员工时对比</h3>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 8%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend />
              <Bar dataKey="定额工时" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="实际工时" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="有效工时" fill="hsl(280, 65%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Records Table */}
      <div className="data-card tech-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">工时核销记录</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">任务单号</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">产品名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">操作人员</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">定额工时</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">实际工时</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">偏差</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">日期</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-data text-xs text-primary">{record.taskNo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{record.productName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{record.operator}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-data text-sm text-foreground">{record.quotaHours}h</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-data text-sm text-foreground">{record.actualHours}h</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-data text-sm",
                      record.deviation > 0 ? "text-destructive" : "text-success"
                    )}>
                      {record.deviation > 0 ? "+" : ""}{record.deviation}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", statusConfig[record.status])}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">{record.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
