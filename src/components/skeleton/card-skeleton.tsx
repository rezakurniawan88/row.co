import { CarouselItem } from "../ui/carousel";

function CardSkeleton() {
    return (
        <>
            <CarouselItem className="h-full cursor-pointer">
                <div className="bg-grayCard h-80 rounded-2xl overflow-hidden mb-6 animate-pulse">
                </div>
            </CarouselItem>
            <CarouselItem className="h-full cursor-pointer">
                <div className="bg-grayCard h-80 rounded-2xl overflow-hidden mb-6 animate-pulse">
                </div>
            </CarouselItem>
            <CarouselItem className="h-full cursor-pointer">
                <div className="bg-grayCard h-80 rounded-2xl overflow-hidden mb-6 animate-pulse">
                </div>
            </CarouselItem>
            <CarouselItem className="h-full cursor-pointer">
                <div className="bg-grayCard h-80 rounded-2xl overflow-hidden mb-6 animate-pulse">
                </div>
            </CarouselItem>
        </>
    )
}

export default CardSkeleton;