import { Alert } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { wrappedLocalStorage } from '../../functions';
import { GetAllGames } from '../../Queries/GetAllGames';
import { JoinGameQuery } from '../../Queries/JoinGameQuery';
import { LoginQuery } from '../../Queries/LoginQueries';
import { useInterval } from '../../useInterval';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'
import { ViewList } from './RunningGamesPage.style';

export default function RunningGamesPage() {
    // const dispatch = useDispatch();
    let history = useHistory();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState(false)
    const [GamesList, setGamesList] = React.useState([])
    const token = wrappedLocalStorage('TOKEN').get();


    useInterval(() => {
        GetAllGamesCreated();
    }, 4000)

    const GetAllGamesCreated = async () => {
        try {
            const response: any = await GetAllGames(token);
            setGamesList(response);
        } catch (error) {

        }
    }

    const joinGame = async (gameId: string) => {
        try {
            const response = await JoinGameQuery({ gameId, token });
            if (response.data.data.success) {
                return history.push('/play-ground')
            }
        } catch (error: any) {
            return alert(error.response.data.error)
        }
    };


    return (
        <div style={{
            margin: 30,
        }}>
            {GamesList.length > 0 ? (<Auth>
                <h4>Running Games</h4>
                <span>Join a games</span>
                <div>
                    {GamesList.map((game: any, i: number) => {
                        return (
                            <ViewList key={i} onClick={() => joinGame(game._id)}>
                                <div>
                                    <div>{game.starter ? game.starter.userName : 'ju'}</div>
                                    <div>{game.starter ? game.amount : 'ju'}</div>
                                </div>
                                <button>Join Game</button>
                            </ViewList>
                        )
                    })}
                </div>
            </Auth>) : (
                <div>
                    <div>No games running, create a game</div>
                    <ButtonWithLoader title='create game' onClick={() => history.push('/create-new-game')} isLoading={isLoading} />
                </div>
            )}
            <ToastComponents />
        </div>
    )
}
