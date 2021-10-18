import './pic.scss';

import { useState } from 'react';

import classNames from 'classnames';



function Picperson({pic, picphot}) {
    let arrpic = [1,2,3,4];
    const [picwind, setPicwind] = useState(false);
    
    const clickedpic = () => {
        setPicwind(!picwind)
    }

    const clickon = (it) => {
        picphot(it);
        clickedpic();
    }
    
    
    
    return(
        <div className="picphoto" >
            <div className="picphoto__pic"  >
                
                <img src={require(`../pics/${pic}.jpg`).default} alt="" onClick={clickedpic} />
            </div>
            
            {picwind && (
                <div className="picphoto__pics">
                    <ul>
                        {arrpic.map((item, index)=>(
                            <li key={index}  onClick={() => clickon(item)}><img className={classNames({'activpic': (item === pic)})} src={`/pics/${item}.jpg`} alt="ee"/></li> 
                        ))}
                    </ul>
                </div>
            )}
          
        </div>  
    )
}

export default Picperson;