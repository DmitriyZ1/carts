import './forms.scss'

import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';

import { filepic, url } from './setup.json';
import Picperson from './Picperson';
import Modal from './Modal';




function Trans() {
  let idpers = useParams();
  
  const [person, setPerson] = useState();

  const [persModalName, setPersModalName] = useState(null);
  
  const colorarr = [1,2,3];
  const [coloract, setColoract] = useState(2);
  const [windcolor, setWindcolor] = useState(false);
  
  const history = useHistory();
  let forma = useRef();
  
 
  const [actpic, setActpic] = useState(1);
  const [modalactived, setModalactived] = useState(false);
  const [modalactivdel, setModalactivdel] = useState(false);
  const [errorpole1, setErrorpole1] = useState(false);
  const [errorpole2, setErrorpole2] = useState(false);
  const [errorpole3, setErrorpole3] = useState(false);
  const [errorpole4, setErrorpole4] = useState(false);
  
  const modaltexted = {title: "Педупреждение!", text: `Вы действительно хотите изменить?`}
  const modaltextdel = {title: "Педупреждение!", text: `Вы действительно хотите удалить ${persModalName}?`}

  useEffect(() => {
    console.log('serv');
    fetch(url.host1 ,{
      method: 'POST',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({action: 'getpers', id: idpers.idpers})          
    }).then((data) => data.json())
    .then(item => {setPerson(item); setPersModalName(item.name)});
        
  },[idpers]);
  
  
  
  useEffect(() => {
    if (person){
      forma.current.name.value = person.name || '';
      forma.current.surname.value = person.surname || '';
      forma.current.mail.value = person.mail || '';
      forma.current.phone.value = person.phone || '';
      forma.current.sex.value = person.sex || '';
      setColoract(+person.color);
      setActpic(filepic.find(item => person.pic === item.file).pic);
    }
  }, [person])
  
  const transok = (e) => {
    setErrorpole1(false)
    setErrorpole2(false)
    setErrorpole3(false)
    setErrorpole4(false)
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
      setModalactived(true);
    } 
  }
  
  const persdel = () => {
    setModalactivdel(true);
  }
  
  const picphot = (item) => {
    setActpic(item)
  }
    
  const clickedoned = () => {
    let newperson = {
      name: forma.current.name.value,
      surname: forma.current.surname.value,
      phone: forma.current.phone.value,
      mail: forma.current.mail.value,
      sex: forma.current.sex.value,
      pic: `${actpic}.jpg`,
      id: person.id,
      color: coloract,
    }
    
    fetch(url.host1 ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify({action: 'edit' , person: newperson})          
    });
    history.push("/");
  }

  const clickedondel = () => {
    fetch(url.host1,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify({action: 'del' , id: person.id})          
    });
    history.push("/");
  }

  const clikedotm = () => {
    setModalactived(false);
    setModalactivdel(false);
  }
  
  const funccolor = (id) => {
    setColoract(id)
  }

  
  
  return (
    <div className="forma___contain">
      <h2> Изменить </h2>
      <div className={`forma__content color${coloract}`}>
        <div className="colors" onClick={() => setWindcolor(!windcolor)}>
          {windcolor ? (<span> цвет &#9650; </span>) : (<span> цвет &#9660; </span>)}
          {windcolor && (
            <div className="colorsitems">
              {colorarr.map((item, index) => (
                <div onClick={()=>{funccolor(item)}} className={classNames(`colit color${item}`, {'coloractiv': (item === coloract)})} key={index}></div>
              ))}
            </div>
          )}
        </div>
        <form ref={forma}> 
            <div className="pole" > 
              <span className="formname" > Имя </span>
              <input type="text" placeholder="Name" name="name" className={classNames("int", {'errorinput': errorpole1})}/>
              <span className="er">{(errorpole1) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="pole">
              <span className="formname" > Фамилия </span>
              <input type="text" placeholder="Surname" name="surname" className={classNames("int", {'errorinput': errorpole2})}/>
              <span className="er">{(errorpole2) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="pole">
              <span className="formname" > Почта </span>
              <input type="text" placeholder="Mail" name="mail" className={classNames("int", {'errorinput': errorpole3})}/>
              <span className="er">{(errorpole3) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="pole">
              <span className="formname" > Телефон </span>
              <input type="text" placeholder="Phone" name="phone" className={classNames("int", {'errorinput': errorpole4})}/>
              <span className="er">{(errorpole4) ? '- Заполните поле' : ''} </span>
            </div>
            <div className="polesex">Пол:
              <label> муж
                <input name="sex" type="radio" value="male"/> 
              </label>
              <label> жен
                <input name="sex" type="radio" value="female"/>
              </label>
            </div> 
          <Picperson pic={actpic} picphot={picphot}/>
        </form>
        <hr/>
        <span className="knopkaPush" onClick={transok}>Изменить</span>
        <span className="knopkaPush" onClick={() => {history.push("/")}}>Отмена</span>
        <span className="knopkaPush" onClick={persdel}>Удалить</span>
      </div>
      {(modalactived) && <Modal funOk={clickedoned} funOtm={clikedotm} text={modaltexted}/>}
      {(modalactivdel) && <Modal funOk={clickedondel} funOtm={clikedotm} text={modaltextdel}/>}
    </div>
    );
  }
  
  export default Trans;