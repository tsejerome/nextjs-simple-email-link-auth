import Head from 'next/head'
import React, { useEffect, useState } from 'react';
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
          {locale.common.login}
        </P1>
        <JPInput
          text={email}
          isValid={isEmailValid}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onEnterPress={onClick}
          placeholderText={locale.common.email_placeholder}
          customContainerStyle={{ backgroundColor: Colours.White }}
        />
        <JPInput
          maxLength={15}
          text={password}
          type={'password'}
          onChangeText={(text) => {
            setPassword(text);
          }}
          isValid={isPasswordValid}
          onEnterPress={onClick}
          placeholderText={locale.common.password_placeholder}
          customContainerStyle={{ backgroundColor: Colours.White }}
        />
        <JPButton
          disabled={!(isEmailValid && isPasswordValid)}
          onClick={onClick}
        >
          {locale.common.next}
        </JPButton>
      </CenteredContainer>
    </div>
  )
}
