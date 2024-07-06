import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { logoutUser } from '../api/auth-api';
import { FIREBASE_AUTH } from '../core/config';
import { useNavigation } from '@react-navigation/native';

const auth = FIREBASE_AUTH;

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      navigation.replace('StartScreen');
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Let’s start, {userName}</Header>
      <Paragraph>
        Your amazing app starts here. Open your favorite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={handleLogout}>
        Logout
      </Button>
    </Background>
  );
}
