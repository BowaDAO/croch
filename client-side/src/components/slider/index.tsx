import Image from "next/image";
import { useState, TouchEvent } from "react";
import { AddToWishlist, ProductCardOwnerInfo, RoundIconButton } from "..";
import { icons } from "@/constants";

type Props = {
  hideButton: boolean;
  product: Product;
};

const Slider = (props: Props) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const swipeSlider = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;

    const delta = e.touches[0].clientX - touchStart;

    if (delta > 50) {
      setIndex(index === props.product.photos.length - 1 ? 0 : index - 1);
    } else if (delta < -50) {
      setIndex(
        index === props.product.photos.length - 1
          ? props.product.photos.length - 1
          : index + 1
      );
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full h-[270px] rounded-lg"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchMove={swipeSlider}
      onTouchEnd={() => setTouchStart(null)}
    >
      <div className="flex">
        {props.product.photos?.map((data, sliderIndex) => {
          const opacity = index === sliderIndex ? "opacity-[1]" : "";

          return (
            <div
              key={sliderIndex}
              className={`relative h-[270px] w-full flex-shrink-0 transition-transform duration-500 ease-in-out bg-grey ${opacity}`}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              <Image
                key={sliderIndex}
                src={data}
                alt=""
                fill
                quality={100}
                loading="lazy"
                sizes="any"
                className="object-cover"
                decoding="async"
              />
            </div>
          );
        })}

        <span
          className={`${props.product.availability === "available" ? "text-lightgreen" : "text-skyblue"} absolute left-[5%] top-4 w-fit py-1 px-3 bg-white rounded capitalize text-sm`}
        >
          {props.product.availability}
        </span>

        <AddToWishlist
          extraClasses="absolute right-[5%] top-4"
          notInWishlistIcon={icons.bookmark}
          alreadyInWishlistIcon={icons.redheart}
          productId={props.product._id}
        />

        {!props.hideButton && index > 0 && (
          <RoundIconButton
            onClick={(e) => {
              e.preventDefault();
              setIndex(index - 1);
            }}
            label={
              <Image
                src={icons.chevronleft}
                alt="chevron prev button icon"
                height={10}
                width={6}
              />
            }
            extraClasses="absolute left-[5%] top-1/2 bg-white"
            arialabel="Slider prev button"
          />
        )}

        {!props.hideButton && index < props.product.photos.length - 1 && (
          <RoundIconButton
            onClick={(e) => {
              e.preventDefault();
              setIndex(index + 1);
            }}
            label={
              <Image
                src={icons.chevronright}
                alt="chevron-next-button-icon"
                height={10}
                width={6}
              />
            }
            extraClasses="absolute right-[5%] top-1/2 bg-white"
            arialabel="Slider next button"
          />
        )}

        {!props.hideButton && (
          <ProductCardOwnerInfo
            product={props.product}
            extraClasses="absolute bottom-4 right-[5%] left-[5%] "
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
