import { useState } from "react";
import { 
  Package, 
  Search, 
  Filter, 
  Plus,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  Wrench,
  Box,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: "原材料" | "刀具" | "量具" | "成品" | "在制品";
  location: string;
  quantity: number;
  unit: string;
  safetyStock: number;
  status: "正常" | "低库存" | "超储" | "预警";
  lastUpdated: string;
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    code: "MAT-AL6061-001",
    name: "铝板AL6061",
    category: "原材料",
    location: "A区-08-02",
    quantity: 150,
    unit: "张",
    safetyStock: 100,
    status: "正常",
    lastUpdated: "2024-03-20 10:00",
  },
  {
    id: "2",
    code: "TOOL-T2024-001",
    name: "铣刀T-2024",
    category: "刀具",
    location: "刀具库-12-05",
    quantity: 8,
    unit: "把",
    safetyStock: 20,
    status: "低库存",
    lastUpdated: "2024-03-20 09:30",
  },
  {
    id: "3",
    code: "GAUGE-001",
    name: "外径千分尺",
    category: "量具",
    location: "量具室-03-01",
    quantity: 12,
    unit: "台",
    safetyStock: 5,
    status: "正常",
    lastUpdated: "2024-03-19 14:00",
  },
  {
    id: "4",
    code: "FP-A001-001",
    name: "精密轴承A型",
    category: "成品",
    location: "成品库-C-05",
    quantity: 500,
    unit: "件",
    safetyStock: 200,
    status: "正常",
    lastUpdated: "2024-03-20 11:30",
  },
  {
    id: "5",
    code: "WIP-B002-001",
    name: "航空接头B型(半成品)",
    category: "在制品",
    location: "车间线边仓",
    quantity: 25,
    unit: "件",
    safetyStock: 0,
    status: "正常",
    lastUpdated: "2024-03-20 08:00",
  },
  {
    id: "6",
    code: "MAT-STEEL-002",
    name: "45号钢棒",
    category: "原材料",
    location: "B区-03-10",
    quantity: 30,
    unit: "根",
    safetyStock: 50,
    status: "预警",
    lastUpdated: "2024-03-19 16:00",
  },
];

const categoryConfig = {
  "原材料": { color: "bg-primary/20 text-primary", icon: Layers },
  "刀具": { color: "bg-secondary/20 text-secondary", icon: Wrench },
  "量具": { color: "bg-accent/20 text-accent", icon: Box },
  "成品": { color: "bg-success/20 text-success", icon: Package },
  "在制品": { color: "bg-warning/20 text-warning", icon: Box },
};

const statusConfig = {
  "正常": "text-success",
  "低库存": "text-destructive",
  "超储": "text-warning",
  "预警": "text-warning",
};

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("all");

  const lowStockCount = inventoryItems.filter(
    (i) => i.status === "低库存" || i.status === "预警"
  ).length;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">库存管理</h1>
          <p className="text-sm text-muted-foreground mt-1">
            原材料、刀具、量具、成品的库存管控
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowDownToLine className="w-4 h-4" />
            入库
          </Button>
          <Button variant="outline" className="gap-2">
            <ArrowUpFromLine className="w-4 h-4" />
            出库
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            新增物料
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {inventoryItems.filter((i) => i.category === "原材料").length}
              </p>
              <p className="text-xs text-muted-foreground">原材料种类</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {inventoryItems.filter((i) => i.category === "刀具").length}
              </p>
              <p className="text-xs text-muted-foreground">刀具种类</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {inventoryItems.filter((i) => i.category === "成品").length}
              </p>
              <p className="text-xs text-muted-foreground">成品种类</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Box className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {inventoryItems.filter((i) => i.category === "在制品").length}
              </p>
              <p className="text-xs text-muted-foreground">在制品批次</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{lowStockCount}</p>
              <p className="text-xs text-muted-foreground">库存预警</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="data-card tech-border">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="material">原材料</TabsTrigger>
              <TabsTrigger value="tool">刀具</TabsTrigger>
              <TabsTrigger value="gauge">量具</TabsTrigger>
              <TabsTrigger value="finished">成品</TabsTrigger>
            </TabsList>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索物料编码、名称..."
                  className="h-9 pl-9 pr-4 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                筛选
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">物料编码</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">物料名称</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">类别</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">库位</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">库存数量</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">安全库存</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">更新时间</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems
                    .filter((item) => {
                      if (activeTab === "all") return true;
                      if (activeTab === "material") return item.category === "原材料";
                      if (activeTab === "tool") return item.category === "刀具";
                      if (activeTab === "gauge") return item.category === "量具";
                      if (activeTab === "finished") return item.category === "成品";
                      return true;
                    })
                    .map((item) => {
                      const catConfig = categoryConfig[item.category];
                      const CatIcon = catConfig.icon;

                      return (
                        <tr
                          key={item.id}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <span className="font-data text-xs text-primary">{item.code}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-foreground">{item.name}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-medium inline-flex items-center gap-1",
                                catConfig.color
                              )}
                            >
                              <CatIcon className="w-3 h-3" />
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-muted-foreground">{item.location}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-data text-sm text-foreground">
                              {item.quantity} {item.unit}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-data text-sm text-muted-foreground">
                              {item.safetyStock} {item.unit}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "text-xs font-medium flex items-center gap-1",
                                statusConfig[item.status]
                              )}
                            >
                              {(item.status === "低库存" || item.status === "预警") && (
                                <AlertTriangle className="w-3 h-3" />
                              )}
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
