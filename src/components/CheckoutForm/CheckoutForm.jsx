import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { createBuyOrder } from '../../firebase/config';


function CheckoutForm() {

const [dataForm, setDataForm] = useState({
    name:'',
    phone: '',
    email: ''
  })

  const navigate = useNavigate()
  const context = useContext(CartContext);
  const { cart, vaciarCarrito, getItemPrice } = context;

  function handleCheckout(event) {
    event.preventDefault();
    const orderData = {
      buyer: dataForm,
      items: cart,
      total: getItemPrice(),
    }
    createBuyOrder(orderData)
    .then(resp => navigate(`/checkout/${resp}`))
    .catch(err => console.log(err))
    .finally(()=> vaciarCarrito())
  }

function inputChangeHandler(event){
  let inputName = event.target.name;
  let value = event.target.value;

  const newDataForm = {...dataForm};
  newDataForm[inputName] = value;
  setDataForm(newDataForm);
}



  return <div className='form-container'>
    <form onSubmit={handleCheckout}>
      <div className='form-item'>
        <label htmlFor="name">Nombre</label>
          <input
          value={dataForm.name}
          onChange={inputChangeHandler}
          name='name'
          type='text'
          placeholder='Nombre'
          required
          />
      </div>

      <div className='form-item'>
        <label htmlFor="phone">Telefono</label>
          <input
          value={dataForm.phone}
          onChange={inputChangeHandler}
          name='phone'
          type='text'
          placeholder='Telefono'
          required
          />
      </div>

      <div className='form-item'>
        <label htmlFor="name">Email</label>
          <input
          value={dataForm.email}
          onChange={inputChangeHandler}
          name='email'
          type='text'
          placeholder='Correo'
          required
          />
      </div>
      <button className='cartview-button-finish' onClick={handleCheckout}>Finalizar Compra</button>
    </form>
  </div>


;}

export default CheckoutForm