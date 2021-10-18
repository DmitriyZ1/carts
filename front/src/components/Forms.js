import Picperson from './Picperson';
import Modal from './Modal';

import classNames from 'classnames';

import './forms.scss'

import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import { url } from './setup.json';



function Forms(){
  
  const colorarr = [1,2,3];
  const [coloract, setColoract] = useState(1);
  const [windcolor, setWindcolor] = useState(false);
  
  let forma = useRef();
  const history = useHistory();
  const [modalactiv, setModalactiv] = useState(false);
  const [actpic, setActpic] = useState(1);
  
  const [errorpole1, setErrorpole1] = useState(false);
  const [errorpole2, setErrorpole2] = useState(false);
  const [errorpole3, setErrorpole3] = useState(false);
  const [errorpole4, setErrorpole4] = useState(false);
  
  const modaltext = {title: "Педупреждение!", text: "Вы действительно хотите добавить?"}
  
  useEffect(() => {
    forma.current.name.value = '';
    forma.current.surname.value = '';
    forma.current.mail.value = '';
    forma.current.phone.value = '';
  }, [])
  
  const picphot = (item) => {
    setActpic(item)
  }
    
  const pushplus = () => {
    setErrorpole1(false);
    setErrorpole2(false);
    setErrorpole3(false);
    setErrorpole4(false);

    let r = [false, false, false, false];
    if(forma.current.name.value === ''){
      r[0] = true;
      setErrorpole1(true)
    }
    if(forma.current.surname.value === ''){
      r[1] = true;
      setErrorpole2(true)
    }
    if(forma.current.mail.value === ''){
      r[2] = true;
      setErrorpole3(true)
    } 
    if(forma.current.phone.value === ''){
      r[3] = true;
      setErrorpole4(true)
    } 
    if (r[0] || r[1] || r[2] || r[3]) {
      return true
    }
    else {
      setModalactiv(true);
    }
  }

  const clickedon = () => {
    let newperson = {
      name: forma.current.name.value,
      surname: forma.current.surname.value,
      phone: forma.current.phone.value,
      mail: forma.current.mail.value,
      sex: forma.current.sex.value,
      pic: `${actpic}.jpg`,
      color: coloract,
    }
    
    fetch(url.host1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify({action: 'add' , person: newperson})          
    })
    history.push("/");
  }

  const clikedotm = () => {
    setModalactiv(false);
  }

  const funccolor = (col) => {
    setColoract(col);
  }

  return(
    <div className="forma___contain">
      <h2> Создать новый </h2>
      <div className={`forma__content color${coloract}`}>
        <div className="colors" onClick={() => setWindcolor(!windcolor)}>
          {windcolor ? (<span> цвет &#9650; </span>) : (<span> цвет &#9660; </span>)}
          {windcolor && (
            <div className="colorsitems">
              {colorarr.map((item, index) => (
                <div onClick={()=>{funccolor(item)}} className={classNames(`colit color${item}`, {'coloractiv': item === coloract})} key={index}></div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={clickedon} ref={forma}> 
            <div className="pole" > 
              <span className="formname" > Имя </span>
              <input type="text"  name="name" className={classNames("int", {'errorinput': errorpole1})}/>
              <span className="er">{(errorpole1) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="pole">
              <span className="formname" > Фамилия</span>
              <input type="text"  name="surname" className={classNames("int", {'errorinput': errorpole2})}/>
              <span className="er" >{(errorpole2) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="pole">
              <span className="formname" > Почта </span>
              <input type="text"  name="mail" className={classNames("int", {'errorinput': errorpole3})}/>
              <span className="er">{(errorpole3) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="pole">
              <span className="formname" > Телефон </span>
              <input type="text" name="phone" className={classNames("int", {'errorinput': errorpole4})}/>
              <span className="er">{(errorpole4) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="polesex">Пол :
              <label> муж
                <input name="sex" type="radio" value="male" defaultChecked/> 
              </label>
              <label> жeн
                <input name="sex" type="radio" value="female"/>
              </label>
            </div> 
          <Picperson pic={actpic} picphot={picphot}/>
        </form>
        <hr/>
        <span className="knopkaPush" onClick={pushplus}>Добавить</span>
        <span className="knopkaPush" onClick={() => {history.push("/")}}>Отмена</span>
      </div>
      {(modalactiv) && <Modal funOk={clickedon} funOtm={clikedotm} text={modaltext}/>}
    </div>
  )
}

export default Forms;