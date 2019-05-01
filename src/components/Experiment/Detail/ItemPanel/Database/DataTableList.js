import React from 'react';
import stylesDatabase from "./Database.scss";
import styles from "../Itempanel.scss";
import databaseImgUrl from "../../../../../assets/img/database.svg";

const DataTableList = ({dataTables}) => {
  return (
    <div className={stylesDatabase.tableList}>
      {
        dataTables && dataTables.map((table) => {
          return (
            <div className={stylesDatabase.tableItem} key={table.tableID}>
                  <span className={`${styles.item} getItem`}
                        data-name={table.tableName}
                        data-desc={table.description}
                        data-shape="read-data-table"
                        data-kind="table"
                        data-type="node"
                        data-size="170*34">
                    <img alt="type" src={databaseImgUrl} className={styles.typeImg}/>{table.tableName}
                  </span>
            </div>
          );
        })
      }
    </div>
  );
};

export default DataTableList;

