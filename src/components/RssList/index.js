import React, {
  useState,
  useEffect,
  useRef,
  isValidElement,
  cloneElement
} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import styles from "./index.module.scss";

const RssList = ({ reader }) => {
  const playerRef = useRef();
  const [playerStatus, setPlayerStatus] = useState(null);
  const [playerItem, setPlayerItem] = useState(null);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [rssData, setRssData] = useState(null);
  const [readerElement, setReaderElement] = useState(null);
  const onReady = data => {
    console.log("received data", data);
    setRssData(data);
  };
  const onError = e => {
    console.log("error", e);
  };
  const play = item => {
    setPlayerVisible(true);
    setPlayerItem(item);
    setPlayerStatus("play");
    playerRef &&
      playerRef.current &&
      playerRef.current.audio &&
      playerRef.current.audio.current.play();
  };
  const pause = item => {
    setPlayerVisible(true);
    playerRef &&
      playerRef.current &&
      playerRef.current.audio &&
      playerRef.current.audio.current.pause();
    setPlayerStatus("pause");
    setPlayerItem(item);
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
      <div className={`${styles.cnt} ${playerVisible && styles.withPlayer}`}>
        {rssData && (
          <>
            <div className={styles.list}>
              <div className={styles.items}>
                {rssData.items.map((item, index) => (
                  <div className={styles.item} key={index}>
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
                      {playerItem &&
                      playerItem.guid === item.guid &&
                      playerStatus === "play" ? (
                        <FontAwesomeIcon
                          icon={faPause}
                          onClick={() => pause(item)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPlay}
                          onClick={() => play(item)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {playerItem && (
              <div className={styles.player}>
                <AudioPlayer
                  ref={playerRef}
                  autoPlay
                  onPause={() => pause(playerItem)}
                  key={playerItem.enclosure.link}
                  src={playerItem.enclosure.link}
                  onPlay={e => console.log("onPlay")}
                  // other props here
                />
                <div className={styles.title}>{playerItem.title}</div>
              </div>
            )}
          </>
        )}
      </div>
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
