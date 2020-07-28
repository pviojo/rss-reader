import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const load = (url, onReady, onError, onState) => {
  onState && onState("loading");
  axios
    .get(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
    .then(rsp => {
      if (rsp && rsp.data && rsp.data.status && rsp.data.status === "ok") {
        onReady && onReady(rsp.data);
      } else {
        onError && onError(rsp);
      }
    })
    .catch(e => {
      onError && onError(e);
      onState && onState("error", e);
    })
    .finally(() => {
      onState && onState("done");
    });
};

const RssRead = ({ url, onState, onError, onReady }) => {
  useEffect(() => {
    load(url, onReady, onError, onState);
  }, [url, onState, onReady, onError]);

  return null;
};

RssRead.defaultProps = {
  onState: () => {},
  onReady: () => {},
  onError: () => {}
};

RssRead.propTypes = {
  url: PropTypes.string.isRequired,
  onState: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func
};

export default RssRead;
