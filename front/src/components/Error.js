import { Link } from 'react-router-dom';


function Error() {
    
    return (
      <>
       <h2>Ошибка</h2>
        <Link to={'/'}> Назад </Link>
      </>
    );
  }
  
  export default Error;