import { FC } from "react";
import Scrollbars from "react-custom-scrollbars";
import FeedElement from "./feed-element/feed-element";
import styles from './orders-feed.module.scss';

const OrdersFeed: FC = (): JSX.Element => {
  return (
    <section className={styles.content}>
       <Scrollbars
        autoHeight={true}
        thumbMinSize={120}
        autoHeightMin={window.innerHeight - 188}
        renderTrackVertical={() => <div className={styles.track_vertical} />}
        renderThumbVertical={() => <div className={styles.thumb_vertical} />}
      >
        <FeedElement/>
      </Scrollbars>
    </section>
  );
};

export default OrdersFeed;
