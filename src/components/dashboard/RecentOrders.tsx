import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Order {
  id: string;
  product: string;
  quantity: number;
  type: "批产" | "研制" | "外协";
  priority: 1 | 2 | 3 | 4 | 5;
  status: "待派单" | "生产中" | "检验中" | "已入库";
}

const orders: Order[] = [
  { id: "ORD-240320-001", product: "精密轴承A型", quantity: 500, type: "批产", priority: 2, status: "生产中" },
  { id: "ORD-240320-002", product: "航空接头B型", quantity: 50, type: "研制", priority: 1, status: "待派单" },
  { id: "ORD-240319-003", product: "密封圈C型", quantity: 2000, type: "批产", priority: 3, status: "检验中" },
  { id: "ORD-240319-004", product: "齿轮组件D型", quantity: 100, type: "外协", priority: 2, status: "生产中" },
  { id: "ORD-240318-005", product: "传动轴E型", quantity: 300, type: "批产", priority: 4, status: "已入库" },
];

const typeColors = {
  "批产": "bg-primary/20 text-primary",
  "研制": "bg-accent/20 text-accent",
  "外协": "bg-warning/20 text-warning",
};

const statusColors = {
  "待派单": "text-muted-foreground",
  "生产中": "text-primary",
  "检验中": "text-warning",
  "已入库": "text-success",
};

const priorityLabels = {
  1: "紧急",
  2: "高",
  3: "中",
  4: "低",
  5: "最低",
};

export function RecentOrders() {
  return (
    <div className="data-card tech-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">最新订单</h3>
        <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
          查看全部 <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">订单号</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">产品</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">数量</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">类型</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">优先级</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">状态</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 font-data text-xs text-primary">{order.id}</td>
                <td className="py-3 text-sm text-foreground">{order.product}</td>
                <td className="py-3 font-data text-sm text-foreground">{order.quantity.toLocaleString()}</td>
                <td className="py-3">
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", typeColors[order.type])}>
                    {order.type}
                  </span>
                </td>
                <td className="py-3">
                  <span className={cn(
                    "text-xs",
                    order.priority === 1 ? "text-destructive font-medium" : "text-muted-foreground"
                  )}>
                    {priorityLabels[order.priority]}
                  </span>
                </td>
                <td className="py-3">
                  <span className={cn("text-xs font-medium", statusColors[order.status])}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
