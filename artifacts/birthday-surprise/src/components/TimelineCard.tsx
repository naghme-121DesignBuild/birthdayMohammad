interface TimelineCardProps {
  title: string;
  text: string;
  photo?: string | null;
}

export default function TimelineCard({ title, text, photo }: TimelineCardProps) {
  return (
    <div className="relative pl-8 py-6 group" data-testid={`timeline-${title.replace(/\s+/g, '-')}`}>
      {/* Line and dot */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent group-last:bg-none group-last:bg-primary/50" />
      <div className="absolute left-[-4px] top-8 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
      
      <div className="bg-card/30 border border-primary/10 rounded-xl p-6 backdrop-blur-sm transition-colors hover:bg-card/50 hover:border-primary/30">
        <h3 className="font-serif text-2xl text-primary mb-3">{title}</h3>
        <p className="font-body text-foreground/80 text-lg leading-relaxed">{text}</p>
        
        {photo && (
          <div className="mt-4 rounded-lg overflow-hidden border border-primary/20 aspect-video">
            <img src={photo} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
