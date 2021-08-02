import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Colours from '../components/Colours';
import { CenteredContainer, P1, JPButton } from '../components/GeneralComponents';
import styles from '../styles/Home.module.css'
import { validateEmail } from '../util';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    setIsEmailValid(email.length >= 5 && validateEmail(email));
    setIsPasswordValid(password.length >= 5);
  }, [email, password]);

  const onClick = () => {
  };

  return (
    <div className={styles.container}>
      <CenteredContainer>
        <P1 style={{
          position: 'absolute',
          padding: 12,
          top: 0,
          right: 0
        }}>
          Email
        </P1>
      </CenteredContainer>
    </div>
  )
}
