import { Shield, Eye, Camera, ShieldCheck } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: Camera,
      color: 'text-blue-400',
      title: '4K Ultra HD',
      description: 'Crystal clear resolution capturing every minute detail with stunning precision.'
    },
    {
      icon: Eye,
      color: 'text-purple-400',
      title: 'Starlight Night Vision',
      description: 'Advanced sensors that turn pitch black environments into full color daylight.'
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-400',
      title: 'AI Human Recognition',
      description: 'On-device neural engine distinguishes between humans, vehicles, and animals.'
    },
    {
      icon: Shield,
      color: 'text-cyan-400',
      title: 'IP66 Waterproofing',
      description: 'Aerospace-grade housing guaranteed to withstand extreme weather conditions.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-8">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="group p-8 rounded-3xl bg-transparent backdrop-blur-sm border border-white/20 shadow-2xl hover:bg-white/5 transition-all duration-300 drop-shadow-xl flex flex-col items-start"
        >
          <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-sm border border-white/20 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
            <feature.icon className={`w-7 h-7 ${feature.color}`} />
          </div>
          <h3 className="text-xl font-heading font-bold mb-3 text-white">{feature.title}</h3>
          <p className="text-slate-300 font-medium leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
