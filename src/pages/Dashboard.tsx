import {
  ClipboardList,
  CheckCircle2,
  Factory,
  TrendingUp,
  Package,
  AlertTriangle,
  Clock,
  Target,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProductionProgress } from "@/components/dashboard/ProductionProgress";
import { EquipmentStatus } from "@/components/dashboard/EquipmentStatus";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { QualityChart } from "@/components/dashboard/QualityChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">综合总览</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控生产全流程，掌握关键指标动态
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-success font-medium">系统运行正常</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="今日订单数"
          value={24}
          change="+12% 较昨日"
          changeType="positive"
          icon={ClipboardList}
          iconColor="primary"
        />
        <StatCard
          title="在制任务"
          value={18}
          change="5项即将完成"
          changeType="neutral"
          icon={Factory}
          iconColor="secondary"
        />
        <StatCard
          title="质量合格率"
          value="98.5%"
          change="+0.3% 较上周"
          changeType="positive"
          icon={CheckCircle2}
          iconColor="primary"
        />
        <StatCard
          title="设备利用率"
          value="87.2%"
          change="-2.1% 较昨日"
          changeType="negative"
          icon={TrendingUp}
          iconColor="warning"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="待检验批次"
          value={8}
          change="2项紧急"
          changeType="negative"
          icon={Target}
          iconColor="warning"
        />
        <StatCard
          title="库存预警"
          value={3}
          change="刀具库存不足"
          changeType="negative"
          icon={Package}
          iconColor="destructive"
        />
        <StatCard
          title="异常告警"
          value={4}
          change="1项需立即处理"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="destructive"
        />
        <StatCard
          title="平均工时偏差"
          value="+5.2%"
          change="优于目标10%"
          changeType="positive"
          icon={Clock}
          iconColor="secondary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Progress - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ProductionProgress />
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertPanel />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Status */}
        <EquipmentStatus />

        {/* Quality Chart */}
        <QualityChart />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
