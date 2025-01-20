import Image from "next/image";

type UserProfileIconProps = {
  imgSrc: string;
};
async function UserProfileIcon(props: UserProfileIconProps) {
  return (
    <div className="overflow-hidden rounded-full">
      {props.imgSrc ? (
        <Image
          alt="user profile icon"
          src={props.imgSrc}
          width={50}
          height={50}
        />
      ) : (
        <Image
          src="/svg-repo/profile-circle.svg"
          height={50}
          width={50}
          alt="user profile icon"
        />
      )}
    </div>
  );
}

export default UserProfileIcon;
