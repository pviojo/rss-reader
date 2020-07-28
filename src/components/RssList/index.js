import React, {
  useState,
  useEffect,
  isValidElement,
  cloneElement
} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

const RssList = ({ reader }) => {
  const [rssData, setRssData] = useState(null);
  const [readerElement, setReaderElement] = useState(null);
  const onReady = data => {
    console.log("received data", data);
    setRssData(data);
  };
  const onError = e => {
    console.log("error", e);
  };

  useEffect(() => {
    if (reader && isValidElement(reader)) {
      const el = cloneElement(reader, { onReady, onError });
      setReaderElement(el);
    }
  }, [reader]);

  return (
    <>
      {readerElement && readerElement}
      {rssData && (
        <div className={styles.items}>
          {rssData.items.map(item => (
            <div className={styles.item}>
              <div className={styles.info}>
                <div className={styles.date}>
                  {moment(item.pubDate).format("YYYY-MM-DD")}
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>
                  {item.description.replace(/(<([^>]+)>)/gi, "")}
                </div>
              </div>
              <div className={styles.buttons}>
                <FontAwesomeIcon icon={faPlay} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

RssList.defaultProps = {
  reader: null
};

RssList.propTypes = {
  reader: PropTypes.object
};

export default RssList;
