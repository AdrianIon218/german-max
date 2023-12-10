import { Ref, forwardRef, useImperativeHandle, useState } from 'react'

export interface PassRef{
    deactivateShowPass:()=>void
}

function Password({password, onChange}:{password:string, onChange:(str:string)=>void}, ref: Ref<PassRef>) {
  const [displayPass, setDisplayPass] = useState(false);

  useImperativeHandle(ref, ()=>({
    deactivateShowPass: () => {setDisplayPass(false)}
  }));

  return (
    <div className="form__group u-margin-bottom-intermediate">
      <input id="password" name="password"
            type={displayPass ? "text":"password"} className="form__input"
            placeholder="Parolă *" required
            value={password}
            onChange={(input) => onChange(input.target.value)}
            minLength={6} maxLength={50}
      />
      <label htmlFor="password" className="form__label form__label__required">
        Parolă
      </label>
      <div className="form__group form__group__checkbox">
        <label htmlFor="pass_toggle" className="form__label">
          Arată parola
        </label>
        <input
          type="checkbox" name="pass_toggle" id="pass_toggle"
          className="form__checkbox"
          checked={displayPass}
          onChange={()=>setDisplayPass((oldStatus) => !oldStatus)}
        />
      </div>
    </div>);
}

export default forwardRef(Password);