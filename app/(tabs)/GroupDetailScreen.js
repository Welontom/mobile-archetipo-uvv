import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, FlatList, StyleSheet } from 'react-native';
import { supabase } from './index';

const GroupDetail = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        
        const { data: groupData, error: groupError } = await supabase
          .from('grupos')
          .select('*')
          .eq('id', groupId)
          .single(); 

        if (groupError) {
          throw groupError;
        }

        setGroupDetails(groupData); 

        
        const { data: studentsData, error: studentsError } = await supabase
          .from('alunos')
          .select('*')
          .eq('grupo_id', groupId); 

        if (studentsError) {
          throw studentsError;
        }

        setStudents(studentsData); 

         
        const { data: evaluationsData, error: evaluationsError } = await supabase
          .from('avaliacao')
          .select('*')
          .eq('grupo_id', groupId);

        if (evaluationsError) {
          throw evaluationsError;
        }

        setEvaluations(evaluationsData); 
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchGroupDetails();
  }, [groupId]); 

  const renderItem = (item) => {
    return item ? (
      <Text>{item.nome || item.aluno || item.nota}</Text>
    ) : null;
  };

  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {groupDetails ? (
        <View>
          <Text style={styles.groupTitle}>Nome: {groupDetails.nome}</Text>
          <Text style={styles.groupDescription}>Descrição: {groupDetails.descricao}</Text> 
          <Text style={styles.memberCount}>Número de Membros: {students.length}</Text>
          
          <Text style={styles.sectionTitle}>Alunos:</Text>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.aluno}</Text>
              </View>
            )}
          />
          

          <Text style={styles.sectionTitle}>Avaliações:</Text>
          <FlatList
            data={evaluations}
            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Nota: {item.nota}</Text> 
                <Text>Comentário: {item.observacoes}</Text> 
              </View>
            )}
          />
        </View>
      ) : (
        <Text>Grupo não encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  groupTitle: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupDescription: {
    fontSize: 17,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  memberCount: {
    fontSize:17,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default GroupDetail;
