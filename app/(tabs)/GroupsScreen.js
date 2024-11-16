import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from './index';

const GroupsScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); 

 
  const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Erro ao recuperar o usuário:', error);
      return;
    }

    if (!user) {
      console.log('Usuário não autenticado. Redirecionando para login.');
      navigation.replace('Login');
      return;
    }

    setUser(user); 
    fetchGroups(); 
  };

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('grupos')
        .select('*'); 

      if (error) {
        throw error;
      }

      console.log('Grupos recuperados:', data);
      setGroups(data);
    } catch (error) {
      console.error('Erro ao recuperar os grupos:', error);

    } finally {
      setLoading(false); 
    }
  };

  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut(); 
      console.log('Usuário deslogado');
      navigation.replace('Login'); 
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };


  const renderGroup = ({ item }) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupName}>{item.nome}</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
      />
    </View>
  );

  useEffect(() => {
    fetchUser(); 
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.welcomeText}>Bem-vindo, {user.email}!</Text> 
      )}
      <Text style={styles.title}>Lista de Grupos</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGroup}
      />
      <Button title="Deslogar" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  groupItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default GroupsScreen;
