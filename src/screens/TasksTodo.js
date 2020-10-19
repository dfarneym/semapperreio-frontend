import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'

import commonStyles from '../commonStyles.js'
import todayImage from '../../assets/imgs/today.jpg'
import barraImage from '../../assets/imgs/barra.jpg'

import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'//importando a data de hoje
import 'moment/locale/pt-br'//Traduz o valor das datas

import Task from '../components/Task'//Usa uma comunicação direta com do pai pata o filho Task
import AddTask from './AddTask'

export default class TasksTodo extends Component {
    
     //Criando um estado no componente
     state = {
         //Esse atributo vai ser baseado no estado das showDoneTasks 
         //se estiver verdadeiro ele vai pegar todas as tasks e mostrar
         //Caso esteja falso ele não vai mostrar as tarefas concluidas 
         //ele vai tirar todas as tarefas concluidas
         visibleTasks: [],
         //Criando atributo que vai mostrar ou não as tasks concluídas
        showDoneTasks: true,
        showAddTask: true,
        tasks: [{
            id: Math.random(),
            desc: 'Estudar IA',
            estimateAt: new Date(),
            doneAt: new Date(),

        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,   
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null, 
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null, 
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null, 
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,  
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,  
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,                       
        }]
    }
    //Assim que o componente for montado
    componentDidMount = () => {
        this.filterTasks()
    }

    //Fazendo a alternancia do valor
    //Sempre qu chamar o metodo ele vai pegar o estado atual e colocar uma negação logica
    //para ele setar no valor, fazendo assim a alternancia do valor seestá verdadeiro fica 
    //falso e se está falso fica verdadeiro
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)

    }

    filterTasks = () => {
        let visibleTasks= null
        if(this.state.showDoneTasks) {
            //clonando um array e pegando um array um array diferente 
            //com os mesmos elementos
            //Com operador spred ele vai espalhar pegando cada um dos elementos do array
            //espalhando e colocando os elementos dentro do array
            visibleTasks = [...this.state.tasks]
        }else {
            //Ele vai retornar as Tarefas que estão pendentes
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        //setando no estado
        this.setState({ visibleTasks })
    }


    //Logica de alteração da classe, pois essa classe tem o estado
    //Essa função vai receber o id da tarefa
    // Alterar o estado da tarefa se eu estiver concluida ela fica
    // aberta e se tiver aberta ele fica concluida
    toggleTask = taskId => {
        //Todos os elementos com todos os elementos
        const tasks = [...this.state.tasks]
        //vou achar qual tarefa tem o mesmo id que eu recebi como parametro
        tasks.forEach(task => {
            if(task.id === taskId) {
                //Se tiver setado a data done vou limpar e se ela tiver limpa nula eu coloco uma data nova
                task.doneAt = task.doneAt ? null : new Date()
            }

        })
        //Passando um novo objeto com tasks epassando 
        //Logo depois o filtro das tarefas para que a tarefa 
        //que já foi concluida fique oculta.
        this.setState({ tasks }, this.filterTasks)

    }
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} 
                    //Esse metodo vai ser chamado ao clicar na aplicação da tela de tarefas
                    //que está dentro do meu modal
                    onCancel={() => this.setState({showAddTask:false})}/>
                <ImageBackground source={todayImage} 
                    style={styles.background}>
             
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>                                                    
                                      
                </ImageBackground>
                               
               
                {/* Passando as propriedades para do componente TasksTodo que é o 
                pai passando via props para as tasks uma comunicação direta*/}
                <View style={styles.tasksTodo}>
                    {/* O FlatList está percorrendo um array de objetos javascript 
                    puro sem conexão com algum componente react-native e criando a escrou */}
                    <FlatList data={this.state.visibleTasks} 
                        //Pega a chave gerada a partir de cada um dos itens
                        //Redenrizando cada um dos itens
                        keyExtractor={item => `${item.id}`}
                       // na função render eu recebo o item sendo ele já desestruturado
                       // Pegando cada atributo e passando para a tarefa, como o id, descrição,
                       //data estimada e a data de conclusão
                       //Tendo assim uma comunicação direta, o componente Pai que é TasksTodo passa para
                       //o componente Tasks o componente filho os  parametros que ele quer que seja usado na hora ,
                       //de rederizar cada uma das Tasks. O pai passando via props os parametros para o filho
                        renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} />}/>
                </View>
                <ImageBackground source={barraImage} 
                    style={styles.barraImageBackground}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            {/* Aqui ele ira fazer uma operação ternaria escolhendo se
                             showDoneTasks estiver true(as tarefas concluidas) ele ira mostrar 'eye'(Olho)
                            se o valor estiver falso ele ira mostrar 'eye-slash'(Olho cortado) */}
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
                           
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //Permitindo que o componente cresça 100% da tela
        flex: 1
    },
    background: {
        flex: 4
    },  
    tasksTodo: {
        flex: 7
    },
    barraImageBackground: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.fontFamily.secondary,
        fontSize: 48,
        marginLeft: 20,
        marginBottom: 1
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.fontFamily.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 15,        
        justifyContent: 'flex-end',
        // Nesse caso se for IOS ele vai dar um margiTop 40 e se for android ele da um marginTop 10 
        marginTop: Platform.OS === 'ios' ? 40 : 10
    }
 

})