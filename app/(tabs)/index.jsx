import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    riscado: {
        textDecorationLine: 'line-through',
        color: 'grey',
    },
    amador: {
        backgroundColor: 'lightblue',
        margin: 5,
        borderRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    }
});


const Tarefas = [
    { id: 1, descricao: 'Comer torrada antes de dormir', feito: false, dataCriacao: new Date() },
    { id: 2, descricao: 'Jogar Fortnite', feito: false, dataCriacao: new Date() },
    { id: 3, descricao: 'Preparar aula da 2ª fase', feito: false, dataCriacao: new Date() },
    { id: 4, descricao: 'Dar comida para os gatos', feito: false, dataCriacao: new Date() },
];


export default function ListaTarefas() {
    const [tarefas, setTarefas] = useState(Tarefas);
    const [novaTarefa, setNovaTarefa] = useState('');


    const toggleFeito = (id) => {
        setTarefas(tarefas.map(tarefa =>
            tarefa.id === id ? { ...tarefa, feito: !tarefa.feito } : tarefa
        ));
    };


    const adicionarTarefa = () => {
        if (novaTarefa.trim()) {
            const nova = {
                id: tarefas.length + 1,
                descricao: novaTarefa,
                feito: false,
                dataCriacao: new Date(),
            };
            setTarefas([...tarefas, nova]);
            setNovaTarefa('');
        } else {
            Alert.alert('Erro', 'A descrição da tarefa não pode estar vazia.');
        }
    };


    const verificarData = () => {
        const umaSemana = 7 * 24 * 60 * 60 * 1000;
        const agora = new Date();
        const tarefasAtualizadas = tarefas.filter(tarefa => agora - tarefa.dataCriacao < umaSemana);


        if (tarefasAtualizadas.length < tarefas.length) {
            Alert.alert("Aviso", "Algumas tarefas desapareceram porque foram criadas há mais de uma semana.");
        }


        setTarefas(tarefasAtualizadas);
    };


    useEffect(() => {
        const intervalo = setInterval(verificarData, 1000 * 60 * 60 * 24);
        return () => clearInterval(intervalo);
    }, [tarefas]);


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova tarefa"
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <Button title="Adicionar" onPress={adicionarTarefa} />
            </View>
            <FlatList
                data={tarefas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.amador}
                        onPress={() => toggleFeito(item.id)}
                    >
                        <Text style={[styles.item, item.feito && styles.riscado]}>
                            {item.descricao}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}



