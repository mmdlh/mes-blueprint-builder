import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  orderNo: string;
  productCode: string;
  productName: string;
  quantity: number;
  type: "批产" | "研制" | "外协";
  priority: 1 | 2 | 3 | 4 | 5;
  status: "待审核" | "待派单" | "生产中" | "检验中" | "已入库" | "已完成";
  customer: string;
  createdAt: string;
  deadline: string;
}

const orders: Order[] = [
  { 
    id: "1", 
    orderNo: "ORD-240320-001", 
    productCode: "P-A001", 
    productName: "精密轴承A型", 
    quantity: 500, 
    type: "批产", 
    priority: 2, 
    status: "生产中",
    customer: "航天一院",
    createdAt: "2024-03-20",
    deadline: "2024-04-05"
  },
  { 
    id: "2", 
    orderNo: "ORD-240320-002", 
    productCode: "P-B002", 
    productName: "航空接头B型", 
    quantity: 50, 
    type: "研制", 
    priority: 1, 
    status: "待派单",
    customer: "航天二院",
    createdAt: "2024-03-20",
    deadline: "2024-03-28"
  },
  { 
    id: "3", 
    orderNo: "ORD-240319-003", 
    productCode: "P-C003", 
    productName: "密封圈C型", 
    quantity: 2000, 
    type: "批产", 
    priority: 3, 
    status: "检验中",
    customer: "航天三院",
    createdAt: "2024-03-19",
    deadline: "2024-04-10"
  },
  { 
    id: "4", 
    orderNo: "ORD-240319-004", 
    productCode: "P-D004", 
    productName: "齿轮组件D型", 
    quantity: 100, 
    type: "外协", 
    priority: 2, 
    status: "生产中",
    customer: "航天四院",
    createdAt: "2024-03-19",
    deadline: "2024-04-01"
  },
  { 
    id: "5", 
    orderNo: "ORD-240318-005", 
    productCode: "P-E005", 
    productName: "传动轴E型", 
    quantity: 300, 
    type: "批产", 
    priority: 4, 
    status: "已入库",
    customer: "航天五院",
    createdAt: "2024-03-18",
    deadline: "2024-03-30"
  },
  { 
    id: "6", 
    orderNo: "ORD-240317-006", 
    productCode: "P-F006", 
    productName: "连接器F型", 
    quantity: 800, 
    type: "批产", 
    priority: 3, 
    status: "已完成",
    customer: "航天六院",
    createdAt: "2024-03-17",
    deadline: "2024-03-25"
  },
];

const typeColors = {
  "批产": "bg-primary/20 text-primary border-primary/30",
  "研制": "bg-accent/20 text-accent border-accent/30",
  "外协": "bg-warning/20 text-warning border-warning/30",
};

const statusColors = {
  "待审核": "bg-muted text-muted-foreground",
  "待派单": "bg-secondary/20 text-secondary",
  "生产中": "bg-primary/20 text-primary",
  "检验中": "bg-warning/20 text-warning",
  "已入库": "bg-success/20 text-success",
  "已完成": "bg-success/30 text-success",
};

const priorityConfig = {
  1: { label: "紧急", color: "text-destructive bg-destructive/10" },
  2: { label: "高", color: "text-warning bg-warning/10" },
  3: { label: "中", color: "text-primary bg-primary/10" },
  4: { label: "低", color: "text-muted-foreground bg-muted" },
  5: { label: "最低", color: "text-muted-foreground bg-muted/50" },
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">生产订单</h1>
          <p className="text-sm text-muted-foreground mt-1">
            管理所有生产订单，支持多源订单导入
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          新建订单
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="data-card tech-border">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-1 gap-3 w-full md:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索订单号、产品、客户..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              筛选
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              导出
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="w-4 h-4" />
              导入
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">全部</span>
            <span className="font-data text-sm text-foreground">{orders.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">待派单</span>
            <span className="font-data text-sm text-warning">{orders.filter(o => o.status === "待派单").length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">生产中</span>
            <span className="font-data text-sm text-primary">{orders.filter(o => o.status === "生产中").length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">已完成</span>
            <span className="font-data text-sm text-success">{orders.filter(o => o.status === "已完成" || o.status === "已入库").length}</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="data-card tech-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                    订单号 <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">产品信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">数量</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">优先级</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">客户</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">交付日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-data text-xs text-primary">{order.orderNo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-foreground">{order.productName}</p>
                      <p className="text-xs text-muted-foreground">{order.productCode}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-data text-sm text-foreground">{order.quantity.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded border text-[10px] font-medium", typeColors[order.type])}>
                      {order.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", priorityConfig[order.priority].color)}>
                      {priorityConfig[order.priority].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", statusColors[order.status])}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{order.customer}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">{order.deadline}</span>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Eye className="w-4 h-4" /> 查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="w-4 h-4" /> 编辑订单
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                          <Trash2 className="w-4 h-4" /> 删除订单
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            显示 1-{filteredOrders.length} 共 {filteredOrders.length} 条
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <Button variant="outline" size="sm" className="bg-primary/10 text-primary">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              下一页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
