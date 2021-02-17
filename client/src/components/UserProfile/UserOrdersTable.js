import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
// import styles from "../OrderTable/orderTable.module.scss"
import { getOrdersUser } from "../../actions/orderActions";
import Moment from "moment";
import { useTranslation } from 'react-i18next';


function UserOrdersTable(props) {

  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    props.getOrdersUser(props.userInfo.id)
  }, [])

  const formatDate = (date) => {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }

  return (
    <Fragment>
      <div onClick={history.goBack} className={" btn btn-light " + "volver"}>Volver</div>
      <h3 className="title">{t("user.history")}</h3>
      <div className="cont">
        <div className="table-responsive" >
          <table className={"table table-sm " + "table"} >
            <thead>
              <tr>
                <th scope="col">{t("user.number")}</th>
                <th scope="col">{t("discounts.phase")}</th>
                <th scope="col">{t("discounts.amount")}</th>
                <th scope="col">{t("order.time")}</th>
                {/* <th scope="col">{t("user.address")}</th> */}
              </tr>
            </thead>
            <tbody >
              {
                props.ordersUser && props.ordersUser.map(order => {
                  let total = 0;
                  order.products.map(product => {
                    total = total + product.price * product.OrderDetails.quantity;
                  })
                  return (
                    <tr key={order.id}>
                      <td scope="row" >
                        <Link exact to={`/users/${order.id}/orders`} >
                          {order.id}
                        </Link>
                      </td>
                      <td>
                        {order.state}
                      </td>
                      <td>
                        ${total.toFixed(2)}
                      </td>
                      <td>
                        {formatDate(order.createdAt)}
                      </td>
                      {/*<td>*/}
                      {/*  {order.address}*/}
                      {/*</td>*/}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}


function mapStateToProps(state) {
  return {
    ordersUser: state.orderStore.ordersUser,
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, { getOrdersUser })(UserOrdersTable);