export interface ICompositionPhotoProps {
  photo: string;
  alt: string;
  class: string;
  title?: string;
}

function CompositionPhoto(props: ICompositionPhotoProps) {
  return (
    <div className="composition__photo__container">
      <img
        src={props.photo}
        alt={props.alt}
        className={`composition__photo ${props.class}`}
      />
      <span className="composition__photo__title">{props.title}</span>
    </div>
  );
}

export default CompositionPhoto;
