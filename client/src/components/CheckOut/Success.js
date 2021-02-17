import React from "react"
import exito from "../../img/pago-exitoso.png"
import styles from "./success.module.scss"
import { useTranslation } from 'react-i18next';


export default function Success() {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.contenedorImagen}>
                <h3 className={styles.titulito}>{t("checkOut.Success")}</h3>
                <img className={styles.imagencita} src={exito} />
            </div>

        </>

    )
}