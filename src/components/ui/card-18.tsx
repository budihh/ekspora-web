import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// CVA for card variants - Adapted to Dark Theme
const cardVariants = cva(
  'group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] text-zinc-300 shadow-sm transition-all duration-500 ease-in-out hover:border-white/20',
  {
    variants: {
      variant: {
        default: 'p-6',
        featured: 'flex-col md:flex-row',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Interface for component props
export interface BlogPostCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  tag: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
  readMoreText?: string;
}

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  ({ className, variant, tag, date, title, description, imageUrl, href, readMoreText = 'Read the full article', ...props }, ref) => {
    
    // Animation variants for framer-motion
    const cardHover = {
      hover: {
        y: -5,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
        },
      },
    };
    
    const content = (
      <>
        {variant === 'featured' && imageUrl && (
          <div className="relative w-full overflow-hidden md:w-1/2 lg:w-3/5 min-h-[300px]">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            {/* Dark gradient overlay for smooth blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] pointer-events-none md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none block md:hidden" />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12 relative z-10 bg-gradient-to-br from-[#050505]/50 to-[#0a0a0a]/90 backdrop-blur-md">
          <div>
            <div className="mb-4 flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-zinc-400">
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[#f3dca6]">{tag}</span>
              <span>{date}</span>
            </div>

            <h3 className="mb-4 text-2xl font-light leading-tight text-white lg:text-4xl tracking-tight">
              <span className="bg-gradient-to-r from-[#f3dca6] to-[#f3dca6] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {title}
              </span>
            </h3>
            
            <p className="text-zinc-400 font-light leading-relaxed mb-4">{description}</p>
          </div>

          {variant === 'featured' && (
            <div className="mt-8">
                <Button variant="outline" className="group/button rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white uppercase tracking-widest text-xs font-medium px-6">
                    {readMoreText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Button>
            </div>
          )}

          {variant === 'default' && (
            <div className="mt-6 flex items-center gap-2 text-xs font-medium tracking-widest text-[#f3dca6]/80 uppercase transition-transform group-hover:translate-x-1 duration-300">
              Read Article <ArrowRight className="h-3 w-3" />
            </div>
          )}
        </div>
      </>
    );

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        variants={cardHover}
        whileHover="hover"
        {...props}
      >
        <a href={href} className="absolute inset-0 z-20" aria-label={`Read more about ${title}`}>
          <span className="sr-only">Read More</span>
        </a>
        <div className="relative z-0 flex h-full w-full flex-col md:flex-row">{content}</div>
      </motion.div>
    );
  }
);

BlogPostCard.displayName = 'BlogPostCard';

export { BlogPostCard };
