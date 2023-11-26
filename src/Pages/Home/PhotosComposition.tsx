import { useId } from "react";
import CompositionPhoto, {
  ICompositionPhotoProps,
} from "./CompositionPhoto";

interface IProps {
  photos: ICompositionPhotoProps[];
}

export default function PhotoComposition(props: IProps) {
  const photoId = useId();
  const photoElements = props.photos.map((item, index) => {
    return <CompositionPhoto {...item} key={`${photoId}-${index}`} />;
  });

  return <div className="composition">{photoElements}</div>;
}
