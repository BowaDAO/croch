import { useState } from "react";
import { Slider, UnclickableRating } from "..";
import Link from "next/link";
import commaNumber from "comma-number";

type Props = {
  product: Product;
};

const ProductCard = (props: Props) => {
  const [hideButton, setHideButton] = useState(true);

  const productUrl = decodeURIComponent(
    `/crafts?title=${props.product.title}&craftId=${props.product._id}`
  ).replaceAll(" ", "-");

  return (
    <Link href={productUrl} target="_blank">
      <div
        onPointerEnter={() => setHideButton(false)}
        onPointerLeave={() => setHideButton(true)}
        className="w-full flex flex-col gap-3"
      >
        <Slider hideButton={hideButton} product={props.product} />

        <div className="flex flex-col gap-2">
          <UnclickableRating />

          <h1 className="text-sm font-semibold text-neutral">
            {props.product?.title}
          </h1>

          <h2 className="text-lg font-bold">
            &#8358;{commaNumber(props.product?.price)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
