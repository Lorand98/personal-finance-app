import { cn } from "@/lib/utils";
import { AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const UserAvatar = ({
  className,
  avatar,
  name,
}: {
  className?: string;
  avatar?: string | null;
  name: string;
}) => {
  // TODO Lazy loading for images
  return (
    <div className={cn("relative h-10 w-10", className)}>
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          fill
          className="rounded-full object-cover background-grey-900"
          placeholder="empty"
          sizes="40px"
        />
      ) : (
        <AvatarIcon className="w-full h-full" />
      )}
    </div>
  );
};

export default UserAvatar;
