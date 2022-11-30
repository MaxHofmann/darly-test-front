import React, { FC } from 'react';

import { AddForm } from '../addCommentForm';
import styles from './popup.module.scss';
import { motion } from 'framer-motion';

type PopupProps = {
  openForm: boolean;
};

const Popup: FC<PopupProps> = ({ openForm }) => {
  return openForm ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
        ease: [0, 0.21, 0.2, 0.01],
      }}
      className={styles.popupStyle}>
      <AddForm title="Add comment" />
    </motion.div>
  ) : null;
};

export { Popup };
