import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserAvatar({
  src,
  fallback,
  className,
}: {
  src: string | undefined;
  fallback: string | undefined;
  className?: string;
}) {
  return (
    <Avatar className={cn('size-26', className)}>
      {src && <AvatarImage className='object-cover' src={src} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
