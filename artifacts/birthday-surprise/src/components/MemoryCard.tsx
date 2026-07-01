import VideoFrame from "./VideoFrame";

interface MemoryCardProps {
  photo: string | null;
  video: string | null;
  title: string;
  caption: string;
  num?: string;
  onClick: () => void;
}

export default function MemoryCard({ photo, video, title, caption, num, onClick }: MemoryCardProps) {
  if (video) {
    return (
      <div onClick={onClick} className="cursor-pointer">
         <VideoFrame src={video} title={title} caption={caption} />
      </div>
    );
  }

  return (
    <button 
      onClick={onClick}
      className="group relative w-full aspect-[4/3] sm:aspect-[3/2] flex flex-col items-center overflow-hidden border border-filmGold/20 rounded-sm bg-filmBlack hover:border-filmGold/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 focus:outline-none"
      data-testid={`memory-card-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {num && (
        <div className="absolute top-4 left-4 z-20 font-ui text-xs tracking-widest text-filmGold/60 drop-shadow-md">
          {num}
        </div>
      )}
      
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {photo ? (
          <img 
            src={photo} 
            alt={title} 
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-filmBg2/40 flex items-center justify-center">
            <span className="font-display text-filmIvory/30">Scene Missing</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-filmBlack/95 via-filmBlack/60 to-transparent flex flex-col items-start text-left z-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
        <h4 className="font-display text-xl sm:text-2xl text-filmIvory mb-1 drop-shadow-lg">{title}</h4>
        <p className="font-body italic text-filmSoftGold/80 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">{caption}</p>
      </div>
    </button>
  );
}