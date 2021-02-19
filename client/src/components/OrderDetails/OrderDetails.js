import React, { Fragment } from "react";
import styles from './orderDetails.module.scss';
import OrderDetailsTable from "./OrderDetailsTable";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function OrderDetails(props) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Fragment>
      <div onClick={history.goBack} className={" btn btn-light " + styles.volver}>
        {t("checkOut.Back")}
      </div>
      <div className={styles.primerDiv}>
        <h2 className={styles.title}>{t("checkOut.Details")}</h2>
        <OrderDetailsTable id={props.id} />
      </div>
      <div className={styles.primerDiv}>
        <h2 className={styles.title}>Detalle de compra</h2>
        <OrderDetailsTable id={props.id} />
      </div>
    </Fragment>
  )
}





