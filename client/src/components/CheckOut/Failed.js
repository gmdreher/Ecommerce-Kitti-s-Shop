import React from "react"
import rechazado from "../../img/pago-rechazado.png"
import styles from "./success.module.scss"
import { useTranslation } from 'react-i18next';

export default function Failed() {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.contenedorImagen}>
                <h3 className={styles.titulito}>{t("checkOut.Fail")}</h3>
                <img className={styles.imagencita} src={rechazado} />
            </div>

        </>

    )
}