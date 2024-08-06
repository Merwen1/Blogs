import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Image
        src="/images/weight-plate.svg"
        alt="weight-plate"
        width={200}
        height={200}
        className="animate-spin"
      />
      <span className="title-text text-black">Site Name</span>
    </div>
  );
}
