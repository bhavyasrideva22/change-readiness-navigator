import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

interface ResultsRadarChartProps {
  wiscarScores: WISCARScores;
}

export const ResultsRadarChart = ({ wiscarScores }: ResultsRadarChartProps) => {
  const data = [
    { subject: 'Will', score: wiscarScores.will, fullMark: 100 },
    { subject: 'Interest', score: wiscarScores.interest, fullMark: 100 },
    { subject: 'Skill', score: wiscarScores.skill, fullMark: 100 },
    { subject: 'Cognitive', score: wiscarScores.cognitive, fullMark: 100 },
    { subject: 'Ability', score: wiscarScores.ability, fullMark: 100 },
    { subject: 'Real-World', score: wiscarScores.realWorld, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            className="text-muted-foreground"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="WISCAR Scores"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.1}
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};