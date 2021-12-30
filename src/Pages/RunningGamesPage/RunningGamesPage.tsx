import { Alert } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { GetAllGames } from '../../Queries/GetAllGames';
import { JoinGameQuery } from '../../Queries/JoinGameQuery';
import { LoginQuery } from '../../Queries/LoginQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

export default function RunningGamesPage() {
    // const dispatch = useDispatch();
    let history = useHistory();
    const [username, setUsername] = React.useState<string>('gabriel');
    const [password, setPassword] = React.useState<string>('Opeyemi@12');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState(false)
    const [GamesList, setGamesList] = React.useState([])
    let token = localStorage.getItem('TOKEN');
    React.useEffect(() => {
        GetAllGamesCreated()
    }, []);

    const GetAllGamesCreated = async () => {
        try{
            const response: any = await GetAllGames(JSON.parse(token ? token : ''));
            console.log(response)
            setGamesList(response);
        } catch(error){
            console.log({error})
        }
    }

    const joinGame = async (gameId: string) => {
        try{
            const response = await JoinGameQuery({gameId, token: JSON.parse(token ? token : '')});
            console.log({ response });
            if(response.data.data.success){
                return history.push('/play-ground')
            }

        }catch(error: any){
            console.log({error})
            return alert(error.response.data.error)
        }
    };
    return (
        <Container>
            <Auth>
                <h4>Login to Shakers</h4>
                <div>
                    {GamesList.map((game: any, i:number)=>{
                        return(
                            <div key={i} onChange={()=> joinGame(game._id)}>
                                <div>
                                    <div>{game.starter ? game.starter.userName : 'ju'}</div>
                                    <div>{game.starter ? game.amount : 'ju'}</div>
                                </div>
                                <button>Join Game</button>
                            </div>
                        )
                    })}
                </div>
            </Auth>
            <ToastComponents />
        </Container>
    )
}
