import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "08:00", 合格率: 98.2, 首检: 95 },
  { time: "09:00", 合格率: 97.8, 首检: 92 },
  { time: "10:00", 合格率: 99.1, 首检: 98 },
  { time: "11:00", 合格率: 98.5, 首检: 94 },
  { time: "12:00", 合格率: 97.2, 首检: 88 },
  { time: "13:00", 合格率: 98.8, 首检: 96 },
  { time: "14:00", 合格率: 99.5, 首检: 100 },
];

export function QualityChart() {
  return (
    <div className="data-card tech-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">质量趋势</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">终检合格率</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-muted-foreground">首检通过率</span>
          </div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFirst" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(215, 20%, 55%)" 
              fontSize={11}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)" 
              fontSize={11}
              tickLine={false}
              domain={[85, 100]}
            />
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
              dataKey="合格率"
              stroke="hsl(199, 89%, 48%)"
              fillOpacity={1}
              fill="url(#colorRate)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="首检"
              stroke="hsl(160, 84%, 39%)"
              fillOpacity={1}
              fill="url(#colorFirst)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
