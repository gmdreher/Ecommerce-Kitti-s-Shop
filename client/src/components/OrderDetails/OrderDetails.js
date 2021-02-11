import React from "react";
import styles from './orderDetails.module.scss';
import { Link } from "react-router-dom";
import OrderDetailsTable from "./OrderDetailsTable";

export default class OrderDetails extends React.Component {

  render() {
    
    return (
      <div className={styles.primerDiv}>
        <Link to={"/admin/orders"}>
          <button className={"btn-light " + styles.volver}>Volver</button>
        </Link>
        <h2 className={"main-Footer " + styles.title}>Detalle de compra</h2>
        <OrderDetailsTable id={this.props.id} />
      </div>
    )
  }}



 

