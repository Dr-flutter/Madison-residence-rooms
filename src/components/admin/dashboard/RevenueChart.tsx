
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPrice } from '@/utils/helpers';

interface DataPoint {
  name: string;
  value: number;
}

const monthlyData: DataPoint[] = [
  { name: 'Jan', value: 2100000 },
  { name: 'Fév', value: 1800000 },
  { name: 'Mar', value: 2500000 },
  { name: 'Avr', value: 3200000 },
  { name: 'Mai', value: 2700000 },
  { name: 'Juin', value: 3500000 },
  { name: 'Juil', value: 4200000 },
  { name: 'Août', value: 4800000 },
  { name: 'Sept', value: 3800000 },
  { name: 'Oct', value: 2900000 },
  { name: 'Nov', value: 2400000 },
  { name: 'Déc', value: 3100000 },
];

const weeklyData: DataPoint[] = [
  { name: 'Lun', value: 420000 },
  { name: 'Mar', value: 380000 },
  { name: 'Mer', value: 520000 },
  { name: 'Jeu', value: 490000 },
  { name: 'Ven', value: 680000 },
  { name: 'Sam', value: 790000 },
  { name: 'Dim', value: 650000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-md">
        <p className="font-medium">{label}</p>
        <p className="text-burgundy font-semibold">
          {formatPrice(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const RevenueChart = () => {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const data = period === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Revenus</h3>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Cette semaine</SelectItem>
            <SelectItem value="monthly">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `${value / 1000000}M`} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#8B0000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
