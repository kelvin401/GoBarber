import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', margin: 30 }}>
      <Button color="#c53030" title="Sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
