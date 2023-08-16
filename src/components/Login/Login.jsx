import { useState } from "react";

export default function Login({login}) {
   

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
      })
    
    
          const handleSubmit = (e) => {
            e.preventDefault();
            login(formValue.email, formValue.password)
            // console.log(formValue.email, formValue.password);
          }
    
    
          
    
        return (
            <div>
                <div className="auth__info">
                    <p className="auth__heading">Вход</p>
                    <form onSubmit={handleSubmit} className="auth__form">
                    <input className="login auth__input" name="email" type="email" onChange={(event) => setFormValue({...formValue, email:event.target.value})} value={formValue.email} placeholder="Email" ></input>
                    <input className="password auth__input" name="password" type="password" onChange={(event) => setFormValue({...formValue, password:event.target.value})} value={formValue.password} placeholder="Пароль"></input>
                    <button className="auth__btn" onSubmit={handleSubmit} type="submit">Войти</button>
                    </form>
                    
                    </div>
            </div>
        )

}