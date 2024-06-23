// components/Greeting.js

import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '@/styles/Animecard.module.css';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const { data, status } = useSession();

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div className={styles.cardhead}>
    <span className={styles.bar}></span>
    <h1 className="text-[18px] md:text-[21px] font-medium mb-2">{greeting} {data?.user?.name}</h1></div>
  );
};

export default Greeting;
