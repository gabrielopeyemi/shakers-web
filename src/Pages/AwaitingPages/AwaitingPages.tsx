import React, { ReactElement } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { wrappedLocalStorage } from '../../functions';
import { CheckIfUserIsInAGameQuery } from '../../Queries/CheckIfUserIsInAGameQuery';
import { CreateQueries } from '../../Queries/CreateQueries';
import { EndGameQuery } from '../../Queries/EndGameQuery';
import { useInterval } from '../../useInterval';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles';
import IMG from './../../assets/GIF/Spinner.gif'
import { TextDiv } from './AwaitingPages.styles';

interface Props {

}

export default function AwaitingPages({ }: Props): ReactElement {

    let history = useHistory();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const token = wrappedLocalStorage('TOKEN').get();
    const gameId = wrappedLocalStorage('GAMEID').get();

    useInterval(() => {
        CheckIfThereisAJoiner().then(()=>{});
    }, 5000)

    const CheckIfThereisAJoiner = async () => {
        try {
            const response = await CheckIfUserIsInAGameQuery(token);
            const main = response.data.data.data;  
            console.log({ main });
            if (main.joiner === undefined) {
                return;
            }
            if (!main) {
                return <Redirect to="/create-new-game" />;
            }
            return history.push('/play-ground')
        } catch (error) {

        }
    }

    const handleEndGame = async () => {
        try {
            const response = await EndGameQuery({ token, gameId});
            if (response.data.data.success) {
                localStorage.removeItem('GAMEID');
                return history.push('/create-new-game')
            }
        } catch (error) {

        }
    }
    return (
        <Container>
            <div>
                <img src={IMG} alt={IMG} />
                <TextDiv>
                    Waiting for user to join game...
                </TextDiv>
                <ButtonWithLoader title={'Cancel Game'} onClick={handleEndGame} isLoading={isLoading} />
            </div>
        </Container>
    )
}
