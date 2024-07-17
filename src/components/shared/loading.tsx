import Image from "next/image";

export default function Loading() {
    return (
        <>
            <div className="flex flex-col gap-5 items-center justify-center w-full z-[800]">
                <Image
                    src="https://media.tenor.com/yS3AotsDZmgAAAAi/animation-boy.gif"
                    width="0"
                    height="0"
                    className="w-[30%] h-[30%]"
                    alt="image"
                />
            </div>
        </>
    );
}
