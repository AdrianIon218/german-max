interface IRadioBtnProps {
  id: string;
  name: string;
  value: string | number;
  label: string;
  change: () => void;
  validate: () => boolean;
}

export default function RadioButton(props: IRadioBtnProps) {
  return (
    <div className="form__radio-group">
      <input
        type="radio"
        className="form__radio-input"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={() => props.change()}
        checked={props.validate()}
      />
      <label htmlFor={props.id} className="form__radio-label">
        <span className="form__radio-button"></span>
        {props.label}
      </label>
    </div>
  );
}
