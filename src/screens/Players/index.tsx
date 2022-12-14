import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/players/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


type RouteParams = {
    group: string;
};

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const route = useRoute();

    const { group } = route.params as RouteParams;

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Por favor, informe o nome da pessoa que você deseja adicionar!');
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        };

        try {
            await playerAddByGroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName('');
            fetchPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.');
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);

            const playersByTeam = await playersGetByGroupAndTeam(group, team);

            setPlayers(playersByTeam);

        } catch (error) {
            Alert.alert('Particiantes', 'Não foi possível carregar os participantes do time!');
        } finally {
            setIsLoading(false);
        }
    }

    async function playerRemove(playerName: string) {
        await playerRemoveByGroup(playerName, group);
        fetchPlayersByTeam();
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            Alert.alert('Remover',
                `Tem certeza que deseja remover ${playerName} da turma?`,
                [
                    { text: 'Não', style: 'cancel' },
                    { text: 'Sim', onPress: () => playerRemove(playerName) },
                ]);
        } catch (error) {
            Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa');
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo!');
        }

    }

    async function handleGroupRemove() {
        Alert.alert('Remover',
            `Tem certeza que deseja remover o grupo ${group}?`,
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() },
            ]);
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />


                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) =>

                    (<Filter
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />)
                    }
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            {isLoading ? <Loading /> :

                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty
                            message="Não há pessoas nesse time!"
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }

            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </Container>
    );
}