import React, { ReactElement } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CheckIfUserIsInAGameQuery } from '../../Queries/CheckIfUserIsInAGameQuery';
import { CreateQueries } from '../../Queries/CreateQueries';
import { EndGameQuery } from '../../Queries/EndGameQuery';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles';
import IMG from './../../assets/GIF/Spinner.gif'
import { TextDiv } from './AwaitingPages.styles';

interface Props {
    
}

export default function AwaitingPages({}: Props): ReactElement {
    
    let history = useHistory();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    let disk = localStorage.getItem('TOKEN');
    let gameId = localStorage.getItem('GAMEID');

    React.useEffect(() => {
        setInterval(()=> {
            CheckIfThereisAJoiner()
        }, 5000)
    }, []);

    const CheckIfThereisAJoiner = async () => {
        try{
            const response = await CheckIfUserIsInAGameQuery(JSON.parse(disk ? disk : ''));
            const main = response.data.data.data;
            console.log({response: response.data.data.data})
            if(main.joiner === undefined){
                console.log('there is no joiner')
                return;
            }
            if(!main){
                return <Redirect to="/create-new-game"/>;
            }
            console.log('There is a joiner')
            return history.push('/play-ground')
        }catch(error){
            console.log({error})
        }
    }

    const handleEndGame = async () =>{
        try{
            const response = await EndGameQuery({token: JSON.parse(disk ? disk : ''), gameId: JSON.parse(gameId ? gameId : '')});
            console.log({response})
            if(response.data.data.success){
                return history.push('/create-new-game')
            }
        }catch(error){
            console.log({error})
        }
    }
    return (
        <Container>
        <div>
            <img src={IMG} alt={IMG} />
            <TextDiv>
                Waiting for user...
            </TextDiv>
            <ButtonWithLoader title={'Cancel Game'} onClick={handleEndGame} isLoading={isLoading}/>
        </div>
    </Container>
    )
}
