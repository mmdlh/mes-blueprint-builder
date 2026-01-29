import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Search,
  Filter,
  FileCheck,
  ClipboardCheck,
  TrendingUp,
  Eye,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InspectionRecord {
  id: string;
  batchNo: string;
  productName: string;
  inspectionType: "首检" | "终检" | "外协检";
  result: "合格" | "不合格" | "待检";
  cpk?: number;
  inspector: string;
  inspectionTime: string;
  defectType?: string;
  quantity: number;
  passCount: number;
}

const records: InspectionRecord[] = [
  {
    id: "1",
    batchNo: "B240320-001",
    productName: "精密轴承A型",
    inspectionType: "首检",
    result: "合格",
    cpk: 1.72,
    inspector: "检验员A",
    inspectionTime: "2024-03-20 09:30",
    quantity: 5,
    passCount: 5,
  },
  {
    id: "2",
    batchNo: "B240320-002",
    productName: "航空接头B型",
    inspectionType: "首检",
    result: "不合格",
    cpk: 0.85,
    inspector: "检验员B",
    inspectionTime: "2024-03-20 10:15",
    defectType: "尺寸超差",
    quantity: 3,
    passCount: 1,
  },
  {
    id: "3",
    batchNo: "B240319-003",
    productName: "密封圈C型",
    inspectionType: "终检",
    result: "合格",
    cpk: 1.45,
    inspector: "检验员A",
    inspectionTime: "2024-03-19 16:00",
    quantity: 2000,
    passCount: 1985,
  },
  {
    id: "4",
    batchNo: "B240319-004",
    productName: "齿轮组件D型",
    inspectionType: "外协检",
    result: "待检",
    inspector: "-",
    inspectionTime: "-",
    quantity: 100,
    passCount: 0,
  },
  {
    id: "5",
    batchNo: "B240318-005",
    productName: "传动轴E型",
    inspectionType: "终检",
    result: "合格",
    cpk: 1.68,
    inspector: "检验员C",
    inspectionTime: "2024-03-18 14:30",
    quantity: 300,
    passCount: 298,
  },
];

const resultConfig = {
  "合格": { color: "bg-success/20 text-success border-success/30", icon: CheckCircle2 },
  "不合格": { color: "bg-destructive/20 text-destructive border-destructive/30", icon: XCircle },
  "待检": { color: "bg-warning/20 text-warning border-warning/30", icon: AlertTriangle },
};

const cpkConfig = (cpk: number) => {
  if (cpk >= 1.67) return { label: "优秀", color: "text-success" };
  if (cpk >= 1.33) return { label: "良好", color: "text-primary" };
  if (cpk >= 1.0) return { label: "一般", color: "text-warning" };
  return { label: "不合格", color: "text-destructive" };
};

export default function Quality() {
  const [activeTab, setActiveTab] = useState("all");

  const passRate = Math.round(
    (records.filter((r) => r.result === "合格").length / records.filter((r) => r.result !== "待检").length) * 100
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">质量检验</h1>
          <p className="text-sm text-muted-foreground mt-1">
            首检、终检、外协检验记录管理
          </p>
        </div>
        <Button className="gap-2">
          <FileCheck className="w-4 h-4" />
          新建检验
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{records.length}</p>
              <p className="text-xs text-muted-foreground">今日检验批次</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">{passRate}%</p>
              <p className="text-xs text-muted-foreground">合格率</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">
                {records.filter((r) => r.result === "待检").length}
              </p>
              <p className="text-xs text-muted-foreground">待检批次</p>
            </div>
          </div>
        </div>
        <div className="data-card tech-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-data font-semibold text-foreground">1.52</p>
              <p className="text-xs text-muted-foreground">平均CPK</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="data-card tech-border">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="first">首检</TabsTrigger>
              <TabsTrigger value="final">终检</TabsTrigger>
              <TabsTrigger value="outsource">外协检</TabsTrigger>
            </TabsList>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索批次号..."
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">批次号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">产品名称</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">检验类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">检验结果</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">CPK</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">合格/总数</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">检验员</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">检验时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {records
                    .filter((r) => {
                      if (activeTab === "all") return true;
                      if (activeTab === "first") return r.inspectionType === "首检";
                      if (activeTab === "final") return r.inspectionType === "终检";
                      if (activeTab === "outsource") return r.inspectionType === "外协检";
                      return true;
                    })
                    .map((record) => {
                      const config = resultConfig[record.result];
                      const ResultIcon = config.icon;
                      const cpkConf = record.cpk ? cpkConfig(record.cpk) : null;

                      return (
                        <tr
                          key={record.id}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <span className="font-data text-xs text-primary">{record.batchNo}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-foreground">{record.productName}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-muted-foreground">{record.inspectionType}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded border text-[10px] font-medium inline-flex items-center gap-1",
                                config.color
                              )}
                            >
                              <ResultIcon className="w-3 h-3" />
                              {record.result}
                            </span>
                            {record.defectType && (
                              <span className="block text-[10px] text-destructive mt-0.5">
                                {record.defectType}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {cpkConf ? (
                              <div className="flex items-center gap-1">
                                <span className={cn("font-data text-sm", cpkConf.color)}>
                                  {record.cpk?.toFixed(2)}
                                </span>
                                <span className={cn("text-[10px]", cpkConf.color)}>
                                  ({cpkConf.label})
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-data text-sm text-foreground">
                              {record.passCount}/{record.quantity}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-foreground">{record.inspector}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-muted-foreground">{record.inspectionTime}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 hover:bg-muted rounded transition-colors">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 hover:bg-muted rounded transition-colors">
                                <Edit className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
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
