import './list.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { url } from './setup.json';

import Modal from './Modal';
import Loading from './Loading';

import { gender } from './setup.json';


function List() {
    const [modalactiv, setModalactiv] = useState(false);
    const [modalid, setModalid] = useState(0);
    const [modalName, setModalName] = useState(0);
    const [person, setPerson] = useState();
    const history = useHistory();
    
    
    useEffect(() => {
        fetch(url.host1,{
            method: 'GET',
        }).then((data) => data.json())
        .then(item => setPerson(item))
    },[])

    useEffect(() => {
        fetch(url.host1,{
            method: 'GET',
        }).then((data) => data.json())
        .then(item => setPerson(item))
    },[modalactiv])
    
    let modaltext = {
        title: "Предупреждение!",
        text: `Вы действительно хотите удалить ${modalName}? ` 
    }
    
    let clickTrans = (data) => {
        history.push(`/transf/${data.id}`);
        console.log(`fuck${data.id}`)
    }
    
    let clickDelModal = (data) => {
        setModalactiv(true);
        setModalid(data.id);
        setModalName(data.name)
    }

    let cliclDelOk = () => {
        fetch(url.host1,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({action: 'del' , id: modalid})          
        });
        setModalactiv(false);
    }
    
    let clickDelNo = () => {
        setModalid(0);
        setModalactiv(false);
    }
    
    return (
        <div>
            <span className="knopkaPlus" onClick={() => history.push("/forms")}> Создать </span>
            <div className="contain">
                
                { (person) ? person.map((item) => ( 
                    
                    <div className={`cart color${item.color}` } key={item.id}>
                        <div className="date"><span>{item.date}</span></div>
                        <div className="cart__icon"><i className="fa fa-user-circle fa-2x" aria-hidden="true"></i></div>
                        <hr/>
                        <p>Имя : <span> {item.name} </span></p>
                        <p>Фамилия : <span> {item.surname} </span></p>
                        <p>Телефон : <span> {item.phone} </span></p>
                        <p>Почта : <span> {item.mail} </span></p>
                        <p>Пол : <span>{gender.find(el =>  item.sex === el.gen).format}</span> </p>
                        <hr/>
                        <img src={require(`../pics/${item.pic}`).default} alt="" width='70px' height='70px'/>
                        <hr/>
                        <span className="knopka" onClick={() => clickTrans(item)}>Изменить</span>
                        <span className="knopka" onClick={() => clickDelModal(item)}>Удалить</span>                        
                    </div>
                )) : <Loading />} 
            
            </div>
            {(modalactiv) && <Modal funOk={cliclDelOk} funOtm={clickDelNo} text={modaltext}/>}
        </div>
    );
  }
  
  export default List;