import React, {Fragment} from "react";
import styles from './orderdetails.module.scss'


export default function OrderDetails() {
    return (
      <Fragment>
        
        <div className={styles.primerDiv}>
          <h2 className='ml-10'>Detalle de compra</h2>
          <div className={styles.container}>
            <div className="row">
              <div className="col-6">
                <div className={styles.membrete}>
                  <table className={"table " + styles.memtable}>
                    <tbody>
                    <tr>
                      <th scope="row">Id de la compra</th>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th scope="row">Fecha</th>
                      <td>2021-06-6 12:10:22</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-6"></div>
            </div>
    
    
            <div>
              <br/>
              Aca van los productos comprados
              <br/>
              <br/>
            </div>
            <table>
              <tbody>
              <tr>
                <th scope="row">Id de la compra</th>
                <td>1</td>
              </tr>
              <tr>
                <th scope="row">Fecha</th>
                <td>2021-06-6 12:10:22</td>
              </tr>
              <tr>
                <th scope="row">Cantidad</th>
                <td>2</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </Fragment>
    );
}

