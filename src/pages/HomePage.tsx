import React, { FC, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../redux/slices/auth/userSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { fetchItems } from '../redux/slices/Items/asyncActions';
import { selectItemsData } from '../redux/slices/Items/selectors';
import { setCurrentPage, setPopupForm } from '../redux/slices/Items/itemSlice';
import { motion } from 'framer-motion';
import styles from './pagesStyle.module.scss';
import { Popup } from '../components/popup';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();
  const { items, status, currentPage, allItems, switchPopupForm } = useSelector(selectItemsData);

  const [fetching, setFetching] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios.get(`https://63837db41ada9475c80134c2.mockapi.io/comments`).then((respons) => {
      setTotalCount(respons.data.length);
    });
  }, []);

  useEffect(() => {
    if (fetching && allItems.length - 10 < totalCount) {
      dispatch(setCurrentPage(currentPage + 1));

      dispatch(fetchItems({ currentPage: String(currentPage + 1) }));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [allItems, totalCount]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      allItems.length - 10 < totalCount
    ) {
      setFetching(true);
    } else {
      setFetching(false);
    }
  };

  const getItems = async () => {
    dispatch(fetchItems({ currentPage: String(currentPage) }));
  };

  useEffect(() => {
    getItems();
  }, []);

  return isAuth ? (
    <div className={styles.commentsBlock}>
      <h1>Comments</h1>
      <Popup openForm={switchPopupForm} />
      <motion.div
        className={styles.addButtonWrap}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
        <button onClick={() => dispatch(setPopupForm(true))} className={styles.addButton}></button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Theme Name</th>
              <th>Age</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <motion.tr
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}>
                <td>{item.firsName}</td>
                <td>{item.lastName}</td>
                <td>{item.themeName}</td>
                <td>{item.age}</td>
                <td>{item.comment}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        className={styles.addButtonWrap}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
        <button onClick={() => dispatch(removeUser())} className={styles.logOut}>
          Log out from {email}
        </button>
      </motion.div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
