"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Activity,
  Terminal,
  AlertTriangle,
  Lock,
  Cpu,
  Globe,
  Zap,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('traffic'); // 'traffic' or 'map'
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    traffic: "1.2 GB/s",
    threatsBlocked: 142,
    activeNodes: 842,
    systemLoad: "12%"
  });

  // Simulated live data
  useEffect(() => {
    setMounted(true);
    // Initial data generation (Client-only)
    setChartData(Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: 30 + Math.random() * 20
    })));

    const interval = setInterval(() => {
      // Update threats
      const newThreat = {
        id: Math.random().toString(36).substr(2, 9),
        type: ["DDoS Attempt", "SQL Injection", "Brute Force", "Malware Scan"][Math.floor(Math.random() * 4)],
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        status: "Blocked",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        // Isolation Forest Mock Data
        anomalyScore: (0.75 + Math.random() * 0.24).toFixed(3),
        entropy: (Math.random() * 4.5).toFixed(2),
        vector: ["TCP/SYN", "HTTP/POST", "UDP/AMP", "ICMP"][Math.floor(Math.random() * 4)]
      };
      setThreats(prev => [newThreat, ...prev].slice(0, 10));

      // Update stats
      const trafficValue = 1.2 + Math.random() * 0.8;
      setStats(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + (Math.random() > 0.7 ? 1 : 0),
        traffic: trafficValue.toFixed(2) + " GB/s"
      }));

      // Update chart data
      setChartData(prev => {
        const newData = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          value: trafficValue * 40 // Scaled for visualization
        }];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-background min-h-screen text-foreground font-sans selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col gap-8 hidden lg:flex">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg shadow-glow">
            <Shield className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">AEGIS AI</span>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem icon={<Activity size={20} />} label="Overview" active />
          <NavItem icon={<Globe size={20} />} label="Network Map" />
          <NavItem icon={<Shield size={20} />} label="Security Policy" />
          <NavItem icon={<Terminal size={20} />} label="Threat Logs" />
          <NavItem icon={<Lock size={20} />} label="Access Control" />
        </nav>

        <div className="mt-auto p-4 glass rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-safe">System Optimal</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            AI Engine v4.2 actively monitoring 2,412 signature patterns using Isolation Forest anomaly detection.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Security Command Center</h1>
            <p className="text-muted-foreground">Autonomous monitoring for Node-Cluster-04</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
              Export Report
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity">
              Deploy Patch
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Activity className="text-primary" />} label="Traffic Throughput" value={stats.traffic} trend="+4.2%" />
          <StatCard icon={<Shield className="text-safe" />} label="Threats Prevented" value={stats.threatsBlocked} trend="+12" />
          <StatCard icon={<Zap className="text-warning" />} label="Active Connections" value={stats.activeNodes} trend="-2" />
          <StatCard icon={<Cpu className="text-primary" />} label="Compute Load" value={stats.systemLoad} trend="Healthy" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Visualization Simulation - AreaChart / Network Map */}
          <div className="xl:col-span-2 glass rounded-2xl p-6 border border-white/5 min-h-[400px] flex flex-col transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView('traffic')}
                  className={`text-lg font-semibold flex items-center gap-2 transition-colors ${view === 'traffic' ? 'text-foreground' : 'text-muted-foreground hover:text-white'}`}
                >
                  <Activity size={18} className={view === 'traffic' ? 'text-primary' : ''} />
                  Live Traffic
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button
                  onClick={() => setView('map')}
                  className={`text-lg font-semibold flex items-center gap-2 transition-colors ${view === 'map' ? 'text-foreground' : 'text-muted-foreground hover:text-white'}`}
                >
                  <Globe size={18} className={view === 'map' ? 'text-primary' : ''} />
                  Network Map
                </button>
              </div>
              <div className="flex gap-2 text-xs">
                {view === 'traffic' ? (
                  <>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Mbit/s
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-safe/10 text-safe rounded">
                      <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                      Optimal
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    3 Clusters Active
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 w-full relative" style={{ minHeight: '300px' }}>
              {mounted && (
                view === 'traffic' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--primary)', fontSize: '12px' }}
                        labelStyle={{ display: 'none' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        isAnimationActive={true}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <svg viewBox="0 0 400 200" className="w-full h-full max-w-2xl">
                      {/* Grid Lines */}
                      <path d="M0 100 L400 100 M200 0 L200 200" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />

                      {/* Connections */}
                      <g className="text-primary/20">
                        <line x1="100" y1="60" x2="200" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="300" y1="60" x2="200" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="200" y1="140" x2="200" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                      </g>

                      {/* Nodes */}
                      <circle cx="100" cy="60" r="4" className="fill-primary shadow-glow" />
                      <circle cx="100" cy="60" r="12" className="fill-primary/20 animate-pulse" />

                      <circle cx="300" cy="60" r="4" className="fill-primary shadow-glow" />
                      <circle cx="300" cy="60" r="12" className="fill-primary/20 animate-pulse" />

                      <circle cx="200" cy="140" r="4" className="fill-primary shadow-glow" />
                      <circle cx="200" cy="140" r="12" className="fill-primary/20 animate-pulse" />

                      {/* Center Node (Master Controller) */}
                      <rect x="185" y="85" width="30" height="30" rx="6" className="fill-black stroke-primary stroke-2" />
                      <circle cx="200" cy="100" r="6" className="fill-primary animate-pulse" />

                      {/* Labels */}
                      <text x="100" y="40" textAnchor="middle" className="text-[8px] fill-muted-foreground font-mono">NODE-01</text>
                      <text x="300" y="40" textAnchor="middle" className="text-[8px] fill-muted-foreground font-mono">NODE-02</text>
                      <text x="200" y="165" textAnchor="middle" className="text-[8px] fill-muted-foreground font-mono">GATEWAY-HQ</text>
                    </svg>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Activity Feed & AI Analysis */}
          <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col h-full max-h-[600px] xl:max-h-none overflow-hidden">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Terminal size={18} className="text-primary" />
              Real-time Analysis
            </h2>

            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              {/* Threat List */}
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar min-h-[200px]">
                {threats.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm italic">
                    Initializing neural patterns...
                  </div>
                ) : (
                  threats.map((threat) => (
                    <div
                      key={threat.id}
                      onClick={() => setSelectedThreat(threat)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer group ${selectedThreat?.id === threat.id ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {threat.type === "DDoS Attempt" ? <AlertTriangle className="text-danger" size={16} /> : <Lock className="text-primary" size={16} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold group-hover:text-primary transition-colors">{threat.type}</span>
                            <span className="text-[10px] text-muted-foreground">{threat.time}</span>
                          </div>
                          <p className="text-[10px] font-mono text-muted-foreground mb-2">SRC: {threat.ip}</p>
                          <div className="flex items-center gap-1 text-[10px] text-safe font-bold uppercase tracking-widest">
                            <CheckCircle2 size={10} />
                            Mitigated by AI
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* AI Detail Panel */}
              <div className="h-[280px] bg-black/40 rounded-xl border border-white/5 p-4 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
                {selectedThreat ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Isolation Forest Analysis</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full">ID: {selectedThreat.id}</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                      {/* Anomaly Score Gauge */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - selectedThreat.anomalyScore)} className="text-danger shadow-glow" />
                          </svg>
                          <span className="absolute text-[10px] font-bold">{(selectedThreat.anomalyScore * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-tighter">Anomaly Contribution</p>
                          <div className="text-sm font-bold text-danger">High Deviation Detected</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[10px]">
                        <div className="p-2 bg-white/5 rounded border border-white/5">
                          <p className="text-muted-foreground mb-1">Entropy Score</p>
                          <p className="font-mono font-bold text-primary">{selectedThreat.entropy}</p>
                        </div>
                        <div className="p-2 bg-white/5 rounded border border-white/5">
                          <p className="text-muted-foreground mb-1">Attack Vector</p>
                          <p className="font-mono font-bold text-primary">{selectedThreat.vector}</p>
                        </div>
                      </div>

                      <p className="text-[10px] text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-2">
                        "The Isolation Forest algorithm identified this activity as a {selectedThreat.type.toLowerCase()} based on outlier density in the request vector."
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                    <Activity size={32} className="text-white/10" />
                    <p className="text-[11px] text-muted-foreground px-8 leading-relaxed">
                      Select a specific security event from the feed above to view the detailed ML analysis and anomaly weights.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${active ? 'bg-primary text-white shadow-glow' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}>
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  const isNeutral = trend === "Healthy";
  const isNegative = trend.startsWith("-");

  return (
    <div className="glass rounded-2xl p-5 border border-white/5 hover:border-primary/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded ${isNeutral ? 'bg-primary/10 text-primary' : isNegative ? 'bg-danger/10 text-danger' : 'bg-safe/10 text-safe'}`}>
          {trend}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-1">{label}</p>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
    </div>
  );
}
